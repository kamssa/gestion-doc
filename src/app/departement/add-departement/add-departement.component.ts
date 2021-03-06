import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Departement} from "../../model/Departement";
import {StorageMap} from "@ngx-pwa/local-storage";
import {Manager} from "../../model/Manager";
import {DepartementService} from "../../service/departement.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ManagerService} from "../../service/manager.service";
import {AuthService} from "../../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.scss']
})
export class AddDepartementComponent implements OnInit {

  departementForm: FormGroup;
  manager: Manager;
  private dialogConfig;
  personne: any;
  error = '';
  departement: Departement;
  constructor(private fb: FormBuilder, private storage: StorageMap, private router: Router,
              private departementService: DepartementService,
              private dialog: MatDialog, private authService: AuthService,
              private managerService: ManagerService, private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AddDepartementComponent>) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    console.log('localstorage dans la nav bar', currentUser.body.body.accessToken);
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(currentUser.body.body.accessToken);
    console.log('voir id dans nav bar', decoded.sub);
    this.managerService.getPersonneById(decoded.sub).subscribe(result => {
      this.personne = result.body;
      console.log('personne departement voir id', this.personne);
    }),
    this.departementForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
  }
  onSubmit(departementForm){
    let  departement: Departement = {
      libelle: departementForm.libelle,
      description: departementForm.description,
      entreprise: this.personne.entreprise
    };
    console.log('Voir departement', departement);
    this.departementService.ajoutDepartement(departement).subscribe(data => {
      console.log('retour departement', data);
      this.departement = data.body;
      if (data.status === 0){
        this.dialogRef.close(this.departement);
        this._snackBar.open('Succès de l\'opération!', '', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.router.navigate(['service']);
      }else {
        this.error = data.messages[0];
        console.log( data.messages);
      }

    }, error => {
      this.error = error;
      console.log(this.error);

    }
    );

  }

}
