import {Component, HostBinding, OnInit} from '@angular/core';
import {InfoDoc} from "../../model/InfoDoc";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UploadService} from "../../service/upload.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../service/auth.service";
import {ManagerService} from "../../service/manager.service";

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.scss']
})
export class ListDocumentComponent implements OnInit {

  editMode: any;
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
  doc: InfoDoc;
  url: any;
  constructor(private  router: Router,
              private  infoService: UploadService,
              private snackBar: MatSnackBar, private authService: AuthService,
              private managerService: ManagerService,
              private uploadService: UploadService) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    console.log('localstorage dans la nav bar', currentUser.body.body.accessToken);
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(currentUser.body.body.accessToken);
    console.log('voir id dans nav bar', decoded.sub);
    this.managerService.getPersonneById(decoded.sub).subscribe(result => {
      this.personne = result.body;
      this.depName = this.personne.departement.libelle;
      console.log('personne departement voir id', this.personne.departement.libelle);
    }),
  //this.toutsLesInfoDoc();
  this.oInfoDoc = this.searchInfoDocSource
  .pipe(debounceTime(300),
    distinctUntilChanged(),
    switchMap(mc => mc ? this.infoService.rechercheInfoParMc(mc)
    : this.infoService.rechercheInfoParMc('aucun document')));
       console.log(this.oInfoDoc);
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

  onImages(nomDoc: string) {

    console.log('verifier', nomDoc);
    /*this.uploadService.download(this.depName, data.body.nomDoc).subscribe(result => {
      console.log(result.body);
    });*/
   this.uploadService.download(this.depName, nomDoc).subscribe(res => {

     this.url = res.url;
     console.log(this.url);
   });
  }

  modifier(nomDoc: string) {

  }

  supprimer(nomDoc: string) {

  }
}
