import {Component, HostBinding, OnInit} from '@angular/core';
import {InfoDoc} from "../../model/InfoDoc";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";
import {UploadService} from "../../service/upload.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../service/auth.service";
import {ManagerService} from "../../service/manager.service";
import {UpdateDepartementComponent} from "../../departement/update-departement/update-departement.component";
import {MatTableDataSource} from "@angular/material/table";
import {Departement} from "../../model/Departement";
import {MatDialog} from "@angular/material/dialog";
import {UpdateDocComponent} from "../update-doc/update-doc.component";
import {DialogConfirmService} from "../../helper/dialog-confirm.service";
import {Dossier} from "../../model/Dossier";

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.scss']
})
export class ListDocumentComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  name: any;
  infoDoc: InfoDoc;
  @HostBinding('class.is-open')
  isOpen = false;
  title = 'la liste des Documents';
  infoDocs: InfoDoc[] = [];
  selectedInfoDoc: InfoDoc;
  messageSucces: string;
  messageServiceErreur: string;
  statut: number;
  oInfoDoc: Observable<InfoDoc[]>;
  searchInfoDocSource = new BehaviorSubject<string>('');
  pathNullImage = './assets/images/image3.jpg';
  personne: any;
  depName: string;
  idDep: number;
  idEntre: number;
  doc: InfoDoc;
  url: any;
  error = '';
  roles: [];
  ROLE_MANAGER: any;
  ROLE_NAME: string;
  message: string;

  constructor(private  router: Router,
              private  infoService: UploadService,
              private snackBar: MatSnackBar, private authService: AuthService,
              private managerService: ManagerService,
              private uploadService: UploadService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar, private  dialogService: DialogConfirmService,) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    console.log('localstorage dans la nav bar', currentUser.body.body.accessToken);
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(currentUser.body.body.accessToken);
    console.log('voir id dans nav bar', decoded.sub);
    this.managerService.getPersonneById(decoded.sub).subscribe(result => {
      this.personne = result.body;
      if (this.personne.departement){
        this.depName = this.personne?.departement?.libelle;
        this.idDep = this.personne.departement.id;
        console.log('personne departement voir id', this.personne.departement.libelle);
        //this.toutsLesInfoDoc();
        this.oInfoDoc = this.searchInfoDocSource
          .pipe(debounceTime(300),
            distinctUntilChanged(),
            switchMap(mc => mc ? this.infoService.rechercheInfoParMc(mc, this.idDep)
              : this.infoService.rechercheInfoParMc('aucun document', 0) ));
        console.log(this.oInfoDoc);
      }else if (this.personne.entreprise){
        console.log('entre', this.personne.entreprise.id);
        this.idEntre = this.personne.entreprise.id;
        //this.toutsLesInfoDoc();
        this.oInfoDoc = this.searchInfoDocSource
          .pipe(debounceTime(300),
            distinctUntilChanged(),
            switchMap(mc => mc ? this.infoService.rechercheInfoParEntreMc(mc, this.idEntre)
              : this.infoService.rechercheInfoParMc('aucun document', 0) ));
        console.log(this.oInfoDoc);
      }

    });

  }
  toutsLesInfoDoc() {
    this.infoService.getAllInfoDoc()
      .subscribe(data => {
        this.infoDocs = data.body;
        this.statut = data.status;
        console.log(this.infoDocs);
      });

  }
  findSelectedTravauxIndex(): number {
    return this.infoDocs.indexOf(this.selectedInfoDoc);
  }


  search(mc: string) {

    this.searchInfoDocSource.next(mc);
  }

  onSelect(url: any) {

  }

  closeMessage() {
    setTimeout(() => {
      this.messageServiceErreur = '';
    }, 5000);
  }

  onImages(doc: InfoDoc) {
    console.log('verifier', doc);

    this.uploadService.download(doc.dossier.id, doc.nomDoc).subscribe(res => {
      this.url = res.url;
      this.message = 'Fichier Téléchargeable:';
      console.log(this.url);
   });
  }

  modifier(id: number) {
    console.log(id);
       const dialogRef = this.dialog.open(UpdateDocComponent,{
        data: {
          infoDoc: id
        }
      });
       dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });
    }



  supprimer(id: number) {
     this.dialogService.openConfirmDialog('Voulez-vous  supprimer le document ?')
        .afterClosed().subscribe(res => {
        if (res){
          console.log(res);
          this.uploadService.supprimerDocById(id).subscribe(data => {
            this._snackBar.open('Fichier archivé avec succès!', '', {
              duration: 5000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: 'bottom',

            });

          });

        }
      });
    this.router.navigate(['dashboard']);
    }


  redirectToFormation(id: number) {

  }

}
