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
import {Dossier} from "../../model/Dossier";
import {DossierService} from "../../service/dossier.service";

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
  idDos: number;
  messages: any;
  dossiers: Dossier[];
  dossier: Dossier;
  fileInfos: Observable<any>;
  loading = false;
  error = '';
  ROLE_NAME: string;
  roles: [];
  ROLE_MANAGER: any;
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;

//   file : any;

  constructor(private  fb: FormBuilder, private uploadService: UploadService,
              private managerService: ManagerService,
              private dossierService: DossierService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(currentUser.body.body.accessToken);

    this.managerService.getPersonneById(decoded.sub).subscribe(result => {
      this.personne = result.body;
      if (this.personne.entreprise) {
        console.log('je suis manager');
        this.roles = result.body.roles;
        this.roles.forEach(val => {
          this.ROLE_MANAGER = val;
          this.ROLE_NAME = this.ROLE_MANAGER.name;

        });
      } else if (this.personne.departement) {
        this.idDep = result.body?.departement?.id;
        console.log('je suis employe');
        this.roles = result.body.roles;
        this.roles.forEach(val => {
          this.ROLE_MANAGER = val;
          this.ROLE_NAME = this.ROLE_MANAGER.name;

        });
        this.dossierService.getDossierByDep(this.idDep).subscribe(data => {
          console.log(data);
          this.dossiers = data.body;
          console.log(this.dossiers);
        });
      }

    });


    this.initForm();
  }

  initForm() {
    this.docForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      dossier: this.fb.group({
        libelle: [''],
        description: ['']
      })
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
    if (this.ROLE_NAME === 'ROLE_EMPLOYE'){
      const formValue = this.docForm.value;
      console.log(formValue);
      const infoDoc: InfoDoc = {
        libelle: formValue.libelle,
        nomDoc: this.selectedFiles.item(0).name,
        description: formValue.description,
        departement: this.personne.departement,
        dossier: this.dossier,
        idEntreprise: this.personne.departement.entreprise.id
      };
      this.idDos = this.dossier.id;
      console.log('Voir dans info doc ', infoDoc);
      console.log('Voir dans info doc ', this.idDos);
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
          this.idDos = this.dossier.id;
          this.uploadService.upload(data.body.dossier.id, formData).subscribe(
            event => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
                console.log('Voir le message upload=', event.type);
                if (event.type === 1) {
                  this._snackBar.open('Fichier archivé avec succès!', '', {
                    duration: 7000,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
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

      }, error => {
        this.error = "Ce nom de document est déjà utilisé !";
        this.loading = false;
      });
    }else if (this.ROLE_NAME === 'ROLE_MANAGER'){
      this.error = 'Vous n\'êtes pas autorisé à archiver';
    }
  }

  annuler() {

  }

  greetDossier(event) {
    console.log('Voir le select', event.value);
    this.dossierService.getDossierById(event.value).subscribe(data => {
      this.dossier = data.body;
      console.log('valeur de retour de dossier', this.dossier);
    });

  }
}
