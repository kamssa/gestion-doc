import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InfoDoc} from "../../model/InfoDoc";
import {UploadService} from "../../service/upload.service";

@Component({
  selector: 'app-update-doc',
  templateUrl: './update-doc.component.html',
  styleUrls: ['./update-doc.component.scss']
})
export class UpdateDocComponent implements OnInit {
  infoDoc: InfoDoc;
  docForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private uploadService: UploadService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: InfoDoc,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateDocComponent>) { }

  ngOnInit(): void {
    this.uploadService.getDocById(this.data['infoDoc'])
      .subscribe(res => {
        console.log(res.body);
        this.infoDoc = res.body;
        this.docForm = this.fb.group({
          id: this.infoDoc.id,
          version: this.infoDoc.version ,
          libelle: this.infoDoc.libelle,
          nomDoc: this.infoDoc.nomDoc,
          description: this.infoDoc.description,
          departement: this.infoDoc.departement,
          idEntreprise: this.infoDoc.idEntreprise
        });
      });
  }

  onSubmit() {
    let formValue = this.docForm.value;

    this.infoDoc = this.docForm.value;
    this.uploadService.modifInfoDoc(this.infoDoc).subscribe(data => {
      if (data){
        this.infoDoc = data.body;
        this.dialogRef.close(this.infoDoc);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
    });
    this.docForm.reset();
  }
}
