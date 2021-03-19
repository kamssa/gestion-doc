import {Component, Inject, OnInit} from '@angular/core';
import {Departement} from "../../model/Departement";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DepartementService} from "../../service/departement.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-departement',
  templateUrl: './update-departement.component.html',
  styleUrls: ['./update-departement.component.scss']
})
export class UpdateDepartementComponent implements OnInit {
  departement: Departement;
  depForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private departementService: DepartementService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Departement,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateDepartementComponent>) { }

  ngOnInit(): void {
    this.departementService.getDepatementById(this.data['departement'])
      .subscribe(res => {
        console.log(res.body);
        this.departement = res.body;
        this.depForm = this.fb.group({
          id: this.departement.id,
          version: this.departement.version ,
          libelle: this.departement.libelle,
          description: this.departement.description,
          entreprise: this.departement.entreprise
        });
      });
  }

  onSubmit() {
    this.departement = this.depForm.value;
    this.departementService.modifdepartement(this.departement).subscribe(data => {
      if (data){
        this.departement = data.body;
        this.dialogRef.close(this.departement);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
    });
    this.depForm.reset();
  }
}
