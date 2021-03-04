import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Departement} from "../../model/Departement";
import {StorageMap} from "@ngx-pwa/local-storage";
import {Manager} from "../../model/Manager";
import {DepartementService} from "../../service/departement.service";
import {SuccessDialogComponent} from "../../service/shared/dialogs/success-dialog/success-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ManagerService} from "../../service/manager.service";
import {AuthService} from "../../service/auth.service";
import {Employe} from "../../model/Employe";

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
  idEntreprise: number;

  constructor(private fb: FormBuilder, private storage: StorageMap, private router: Router,
              private departementService: DepartementService,
              private dialog: MatDialog, private authService: AuthService,
              private managerService: ManagerService) { }

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
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
      dialogRef.afterClosed()
        .subscribe(result => {
          this.router.navigate(['departement']);
        });
    });
  }

}
