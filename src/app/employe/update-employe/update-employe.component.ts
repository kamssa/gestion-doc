import {Component, Inject, OnInit} from '@angular/core';
import {Departement} from "../../model/Departement";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {DepartementService} from "../../service/departement.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Employe} from "../../model/Employe";
import {EmployeService} from "../../service/employe.service";

@Component({
  selector: 'app-update-employe',
  templateUrl: './update-employe.component.html',
  styleUrls: ['./update-employe.component.scss']
})
export class UpdateEmployeComponent implements OnInit {
  departement: Departement;
  employeForm: FormGroup;
  employe: Employe;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private employeService: EmployeService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Employe,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateEmployeComponent>) { }

  ngOnInit(): void {
    this.employeService.getEmployeById(this.data['employe'])
      .subscribe(res => {
        console.log(res.body);
        this.employe = res.body;
        this.employeForm = this.fb.group({
          id: this.employe.id,
          version: this.employe.version ,
          nom: this.employe.nom,
          prenom: this.employe.prenom,
          email: this.employe.email,
          password: this.employe.password,
          fonction: this.employe.fonction,
          departement: this.employe.departement,
          type: this.employe.type
        });
      });
  }

  onSubmit() {
    let formValue = this.employeForm.value;

    this.departement = this.employeForm.value;
    this.employeService.modifEmploye(this.employe).subscribe(data => {
      if (data){
        this.employe = data.body;
        this.dialogRef.close(this.employe);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
    });
    this.employeForm.reset();
  }
}
