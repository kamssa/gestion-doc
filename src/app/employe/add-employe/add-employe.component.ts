import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Employe} from '../../model/Employe';
import {EmployeService} from '../../service/employe.service';
import {StorageMap} from "@ngx-pwa/local-storage";
import {Manager} from "../../model/Manager";
import {DepartementService} from "../../service/departement.service";
import {Departement} from "../../model/Departement";
import {SuccessDialogComponent} from "../../service/shared/dialogs/success-dialog/success-dialog.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

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
  private dialogConfig;
  constructor(private fb: FormBuilder,
              private employeService: EmployeService, private router: Router,
              private storage: StorageMap, private departementService: DepartementService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.departementService.getAllDepartement().subscribe(data => {
      console.log(data);
      this.departements = data.body;
      console.log(this.departements);
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
      fonction: new FormControl('', [Validators.required]),
      adresse: this.fb.group({
        boitePostal: [''],
        mail: ['', Validators.required],
        pays: ['', Validators.required],
        ville: ['', Validators.required],
        siteWeb:  ['', Validators.required],
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
     console.log('reussi', result.body);
       let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
            dialogRef.afterClosed()
         .subscribe(result => {
           this.router.navigate(['employe']);
         });
   });

  }

  greetDep(event) {

    console.log('Voir le select', event.value);
    this.departementService.getDepatementById(event.value).subscribe(data => {
      this.departement = data.body;
      console.log('valeur de retour de ville', this.departement);
    });

  }
}
