import {Component, Inject, OnInit} from '@angular/core';
import {Departement} from "../../model/Departement";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {DepartementService} from "../../service/departement.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DossierService} from "../../service/dossier.service";
import {Dossier} from "../../model/Dossier";

@Component({
  selector: 'app-update-dossier',
  templateUrl: './update-dossier.component.html',
  styleUrls: ['./update-dossier.component.scss']
})
export class UpdateDossierComponent implements OnInit {
  dossier: Dossier;
  dosForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private dossierService: DossierService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Dossier,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateDossierComponent>) { }

  ngOnInit(): void {
    this.dossierService.getDossierById(this.data['dossier'])
      .subscribe(res => {
        console.log(res.body);
        this.dossier = res.body;
        this.dosForm = this.fb.group({
          id: this.dossier.id,
          version: this.dossier.version ,
          libelle: this.dossier.libelle,
          description: this.dossier.description,
          departement: this.dossier.departement,
          idEntreprise: this.dossier.departement.entreprise.id
        });
      });
  }

  onSubmit() {
    this.dossier = this.dosForm.value;
    console.log(this.dossier);
    this.dossierService.modifDossier(this.dossier).subscribe(data => {
      if (data){
        this.dossier = data.body;
        this.dialogRef.close(this.dossier);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
    });
    this.dosForm.reset();
  }

}
