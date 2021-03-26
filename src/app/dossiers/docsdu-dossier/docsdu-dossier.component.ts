import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Dossier} from "../../model/Dossier";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {DossierService} from "../../service/dossier.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {Departement} from "../../model/Departement";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {UploadService} from "../../service/upload.service";
import {InfoDoc} from "../../model/InfoDoc";

@Component({
  selector: 'app-docsdu-dossier',
  templateUrl: './docsdu-dossier.component.html',
  styleUrls: ['./docsdu-dossier.component.scss']
})
export class DocsduDossierComponent implements OnInit {
  infoDoc: InfoDoc;
  infoDocs: InfoDoc[];
  displayedColumns: string[] = ['libelle', 'date'];
  dataSource: MatTableDataSource<Dossier>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor( private dossierService: DossierService,
               private infoDocService: UploadService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Dossier,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<DocsduDossierComponent>) { }

  ngOnInit(): void {
    this.infoDocService.getDocumentByDossier(this.data['dossier'])
      .subscribe(data => {
        this.infoDocs = data.body;
        console.log('voir les dep retournés', this.infoDocs);
        this.infoDocs.forEach(value => {
          let opp : InfoDoc = value;

          this.receptacle.push(opp);
        });
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<InfoDoc>(this.receptacle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
