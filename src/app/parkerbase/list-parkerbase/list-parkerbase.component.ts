import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Departement} from '../../model/Departement';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../service/auth.service';
import {ManagerService} from '../../service/manager.service';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UploadService} from '../../service/upload.service';
import {InfoDoc} from '../../model/InfoDoc';
import {UpdateParkerbaseComponent} from '../update-parkerbase/update-parkerbase.component';

@Component({
  selector: 'app-list-parkerbase',
  templateUrl: './list-parkerbase.component.html',
  styleUrls: ['./list-parkerbase.component.scss']
})
export class ListParkerbaseComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'date', 'telecharger', 'update', 'delete'];
  dataSource: MatTableDataSource<Departement>;
  infoDocs: InfoDoc[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  roles: [];
  ROLE_MANAGER: any;
  ROLE_NAME: string;
  receptacle: any = [];
  personne: any;
  error = '';
  idEntreprise: number;
  idDep: number;
  test: Date = new Date();
  doc: InfoDoc;
  docId: number;
  url: any;
  message: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private uploadService: UploadService,
              public dialog: MatDialog, private authService: AuthService,
              private managerService: ManagerService,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar, private router: Router,
              private changeDetectorRefs: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    console.log('localstorage dans la nav bar', currentUser.body.body.accessToken);
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(currentUser.body.body.accessToken);
    console.log('voir id dans nav bar', decoded.sub);
    this.managerService.getPersonneById(decoded.sub).subscribe(result => {
      this.personne = result.body;
      if (this.personne.entreprise){
        this.idEntreprise = this.personne.entreprise.id;
        this.roles = result.body.roles;
        console.log(this.roles);
        this.roles.forEach(val => {
          this.ROLE_MANAGER = val;
          this.ROLE_NAME = this.ROLE_MANAGER.name;
          console.log(this.ROLE_NAME);
        });
        this.uploadService.getDocByIdEntre(this.idEntreprise).subscribe(data => {
          this.infoDocs = data.body;
          console.log(this.infoDocs);
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
      }else if (this.personne.departement){
        this.idDep = this.personne.departement.id;
        console.log(this.idEntreprise);
        this.roles = result.body.roles;
        console.log('personne departement voir id', this.personne);
        console.log(this.roles);
        this.roles.forEach(val => {
          this.ROLE_MANAGER = val;
          this.ROLE_NAME = this.ROLE_MANAGER.name;
          console.log(this.ROLE_NAME);
        });
        this.uploadService.getDocByIdDep(this.idDep).subscribe(data => {
          this.infoDocs = data.body;
          console.log('voir les infodocs retournés', this.infoDocs);
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

    });

  }

  applyFilter($event: KeyboardEvent) {

  }

  redirectToUpdate(id: any) {
      const dialogRef = this.dialog.open(UpdateParkerbaseComponent,{
        data: {
          infoDoc: id
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        /*this.departement = result;
        this.receptacle.sort();
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<Departement>(this.receptacle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;*/
        this.changeDetectorRefs.detectChanges();
      });
  }
  redirectToDelete(id: any) {
     this.dialogService.openConfirmDialog('Voulez-vous supprimer le document ?')
        .afterClosed().subscribe(res => {
        if (res){
          console.log(res);
          this.uploadService.supprimerDocById(id).subscribe(data => {
            this._snackBar.open('Succès de l\'opération!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: 'top',

            });
          });

        }
      });
     this.router.navigate(['parkerbase']);
  }
  dowload(id: any) {
    console.log('verifier', id);
    this.uploadService.getDocById(id).subscribe( data => {
      this.doc = data.body;
      this.uploadService.download(this.doc.dossier.id, this.doc.nomDoc).subscribe(res => {
        this.url = res.url;
        this.docId = data.body.id;
        this.message = 'Fichier Téléchargeable:';
        console.log(res);
        console.log(this.url);
      });
    });
  }
}
