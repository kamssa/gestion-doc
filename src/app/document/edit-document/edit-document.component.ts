import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UploadService} from '../../service/upload.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {InfoDoc} from '../../model/InfoDoc';
import {Departement} from "../../model/Departement";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ManagerService} from "../../service/manager.service";
import {AuthService} from "../../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})
export class EditDocumentComponent implements OnInit {
  docForm: FormGroup;
  editMode: boolean;
  infoDocId: number;
  selectedFile: File = null;
  file: any;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  personne: any;
  departement: Departement;
  idDep: number;
  messages: any;

  fileInfos: Observable<any>;

   @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
//   file : any;

  constructor(private  fb: FormBuilder, private uploadService: UploadService,
              private managerService: ManagerService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(currentUser.body.body.accessToken);

    this.managerService.getPersonneById(decoded.sub).subscribe(result => {
      this.personne = result.body;
      this.idDep = result.body?.departement?.id;
      console.log('edit document', this.personne);
    });

    this.initForm();
  }

  initForm() {
    this.docForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  onFileSelected(event) {
    this.selectedFile = (event.target.files[0] as File);
    console.log('Voir le fichier selectionne', this.selectedFile);
  }
  onSubmit(): void {
    const formValue = this.docForm.value;
    console.log(formValue);
    const infoDoc: InfoDoc = {
      libelle: formValue.libelle,
      nomDoc: this.selectedFiles.item(0).name,
      description: formValue.description,
      departement:  this.personne.departement,
      idEntreprise:  this.personne.departement.entreprise.id
    };
    console.log('Voir dans info doc ', infoDoc);
    this.uploadService.ajoutInfoDoc(infoDoc).subscribe(data => {
     console.log('info doc enregistre avec succes', data);
      this.infoDocId = data.body.id;
         console.log(this.infoDocId);
        if (this.infoDocId) {
         this.progress = 0;
         this.currentFile = this.selectedFiles.item(0);
         const formData = new FormData();
         formData.append('file', this.currentFile);
         console.log('formdata', formData);
         this.uploadService.upload(this.idDep, formData).subscribe(
           event => {
             if (event.type === HttpEventType.UploadProgress) {
               this.progress = Math.round(100 * event.loaded / event.total);
               console.log('Voir le message upload=', event.type);
               if (event.type === 1){
                 this._snackBar.open('Succès de l\'opération!', '', {
                   duration: 3000,
                   verticalPosition: 'top',
                 });

              }
               this.fileUpload.nativeElement.value = null;
               this.currentFile = null;
               console.log(this.currentFile);
               this.docForm.reset();

             } else if (event instanceof HttpResponse) {
               this.message = event.body.message;
               // this.fileInfos = this.uploadService.getFiles();
               console.log('Voir le message upload', event.body.message);
             }
           },
           err => {
             this.progress = 0;
             this.message = 'Le fichier ne peut être archivé !';
             this.currentFile = undefined;
           });
         this.selectedFiles = undefined;
        }

    });
  }

  annuler() {

  }

}
