import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Employe} from '../../model/Employe';
import {EmployeService} from '../../service/employe.service';
import {StorageMap} from "@ngx-pwa/local-storage";
import {Manager} from "../../model/Manager";
import {DepartementService} from "../../service/departement.service";
import {Departement} from "../../model/Departement";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ManagerService} from "../../service/manager.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss']
})
export class AddEmployeComponent implements OnInit {
  employeForm: FormGroup;
  manager: Manager;
  departements: Departement[];
  departement: Departement;
  employe: Employe;
  private dialogConfig;
  error = '';
  personne: any;
  constructor(private fb: FormBuilder,
              private employeService: EmployeService, private router: Router,
              private storage: StorageMap, private departementService: DepartementService,
              private dialog: MatDialog, private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AddEmployeComponent>,
              private managerService: ManagerService, private authService: AuthService) {
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    console.log('localstorage dans la nav bar', currentUser.body.body.accessToken);
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(currentUser.body.body.accessToken);
    console.log('voir id dans nav bar', decoded.sub);
    this.managerService.getPersonneById(decoded.sub).subscribe(result => {
      this.personne = result.body;
      this.departementService.getDepByIdEntreprise(this.personne.entreprise.id).subscribe(data => {
        console.log(data);
        this.departements = data.body;
        console.log(this.departements);
      });
    });

    this.storage.get("keymanager").subscribe(data => {
     this.manager = data;
    });
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
    this.initForm();
  }

  initForm(): void {
    this.employeForm = this.fb.group({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      adresse: this.fb.group({
        boitePostal: [''],
        telephone: ['', Validators.required]
      }),
      departement: this.fb.group({
        libelle: ['', Validators.required],
        description: ['', Validators.required]
      })
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.employeForm.controls[controlName].hasError(errorName);
  }
  public createEmploye = (employeFormValue) => {
    if (this.employeForm.valid) {
      this.onSubmit(employeFormValue);
    }
  }
  onSubmit(employeFormValue) {
    console.log(this.employeForm.value);
    let  employe : Employe = {
      nom: employeFormValue.nom,
      prenom: employeFormValue.prenom,
      email: employeFormValue.email,
      password: employeFormValue.password,
      fonction: employeFormValue.fonction,
      departement: this.departement,
      type: 'EMPLOYE',
    };
    console.log(employe);
     this.employeService.ajoutEmploye(employe).subscribe(result => {
       console.log('retour employe', result);
       this.employe = result.body;
       if (result.status === 0){
         this.dialogRef.close(this.employe);
         this._snackBar.open('Succès de l\'opération!', '', {
           duration: 3000,
           verticalPosition: 'top',
         });
         this.router.navigate(['employe']);
       }else {
         this.error = result.messages[0];
         console.log( result.messages);
       }

     }, error => {
       this.error = error;
       console.log(this.error);

     }
     );
  }

  greetDep(event) {

    console.log('Voir le select', event.value);
    this.departementService.getDepatementById(event.value).subscribe(data => {
      this.departement = data.body;
      console.log('valeur de retour de ville', this.departement);
    });

  }
}
