import {Component, HostBinding, OnInit} from '@angular/core';
import {InfoDoc} from "../../model/InfoDoc";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UploadService} from "../../service/upload.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

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

  constructor(private  router: Router, private  infoService: UploadService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
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

  onSelect(infoDoc: InfoDoc) {
    this.selectedInfoDoc = infoDoc;
    console.log(this.selectedInfoDoc.id);
   // this.router.navigate(['technique/addImage', this.selectedInfoDoc.id]);
  }

  closeMessage() {
    setTimeout(() => {
      this.messageServiceErreur = '';
    }, 5000);
  }

  onImages(id: number) {
   // this.router.navigate(['technique/edite', id]);
   // this.router.navigate(['technique/edite', id]);
  }
}
