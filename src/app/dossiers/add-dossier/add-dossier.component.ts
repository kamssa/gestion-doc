import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Manager} from "../../model/Manager";
import {StorageMap} from "@ngx-pwa/local-storage";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../service/auth.service";
import {ManagerService} from "../../service/manager.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JwtHelperService} from "@auth0/angular-jwt";
import {DossierService} from "../../service/dossier.service";
import {Dossier} from "../../model/Dossier";

@Component({
  selector: 'app-add-dossier',
  templateUrl: './add-dossier.component.html',
  styleUrls: ['./add-dossier.component.scss']
})
export class AddDossierComponent implements OnInit {

dossierForm: FormGroup;
  manager: Manager;
  private dialogConfig;
  personne: any;
  error = '';
  dossier: Dossier;
  constructor(private fb: FormBuilder, private storage: StorageMap, private router: Router,
              private dossierService: DossierService,
              private dialog: MatDialog, private authService: AuthService,
              private managerService: ManagerService, private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AddDossierComponent>) { }

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
      this.dossierForm = this.fb.group({
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
  onSubmit(dossierForm){
    let  dossier: Dossier = {
      libelle: dossierForm.libelle,
      description: dossierForm.description,
      departement: this.personne.departement,
      idEntreprise: this.personne.departement.entreprise.id
    };
    console.log('Voir dossier', dossierForm);
    this.dossierService.ajoutDossier(dossier).subscribe(data => {
        console.log('retour dossier', data);
        this.dossier = data.body;
        if (data.status === 0){
          this.dialogRef.close(this.dossier);
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.router.navigate(['dossier']);
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
