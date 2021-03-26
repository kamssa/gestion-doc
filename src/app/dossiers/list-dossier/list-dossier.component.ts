import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Departement} from "../../model/Departement";
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {DepartementService} from "../../service/departement.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../service/auth.service";
import {ManagerService} from "../../service/manager.service";
import {DialogConfirmService} from "../../helper/dialog-confirm.service";
import {Router} from "@angular/router";
import {DossierService} from "../../service/dossier.service";
import {Dossier} from "../../model/Dossier";
import {AddDepartementComponent} from "../../departement/add-departement/add-departement.component";
import {AddDossierComponent} from "../add-dossier/add-dossier.component";
import {UpdateDepartementComponent} from "../../departement/update-departement/update-departement.component";
import {UpdateDossierComponent} from "../update-dossier/update-dossier.component";
import {DocsduDossierComponent} from "../docsdu-dossier/docsdu-dossier.component";

@Component({
  selector: 'app-list-dossier',
  templateUrl: './list-dossier.component.html',
  styleUrls: ['./list-dossier.component.scss']
})
export class ListDossierComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'update', 'delete', 'service'];
  dataSource: MatTableDataSource<Departement>;
  departements: Departement[];
  dossiers: Dossier[];
  dossier: Dossier;
  departement: Departement;
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
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private departementService: DepartementService,
              private dossierService: DossierService,
              public dialog: MatDialog, private authService: AuthService,
              private managerService: ManagerService,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar, private router: Router,
              private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.changeDetectorRefs.detectChanges();
    const currentUser = this.authService.currentUserValue;
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(currentUser.body.body.accessToken);
    this.managerService.getPersonneById(decoded.sub).subscribe(result => {
      this.personne = result.body;
      if (this.personne.entreprise){
       /* this.idEntreprise = this.personne.entreprise.id;
        console.log(this.idEntreprise);
        this.roles = result.body.roles;
        this.roles.forEach(val => {
          this.ROLE_MANAGER = val;
          this.ROLE_NAME = this.ROLE_MANAGER.name;
          console.log(this.ROLE_NAME);
        });
        this.departementService.getDepByIdEntreprise(this.idEntreprise).subscribe(data => {
          this.departements = data.body;
          console.log('voir les dep retournés', this.departement);
          this.departements.forEach(value => {
            let opp : Departement = value;
            this.receptacle.push(opp);
          });
          this.dataSource = this.receptacle;
          this.dataSource = new MatTableDataSource<Departement>(this.receptacle);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });*/
        console.log('c\'est un manager');
      }else if (this.personne.departement){
        this.idDep = this.personne.departement.id;
        this.roles = result.body.roles;
        this.roles.forEach(val => {
          this.ROLE_MANAGER = val;
          this.ROLE_NAME = this.ROLE_MANAGER.name;

        });
        this.dossierService.getDossierByDep(this.idDep).subscribe(data => {
          this.dossiers = data.body;
          console.log('voir les dep retournés', this.dossiers);
          this.dossiers.forEach(value => {
            let opp : Dossier = value;

            this.receptacle.push(opp);
          });
          this.dataSource = this.receptacle;
          this.dataSource = new MatTableDataSource<Dossier>(this.receptacle);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }

    });
  }

  openDialog() {
    if (this.ROLE_NAME === 'ROLE_EMPLOYE'){
      const dialogRef = this.dialog.open(AddDossierComponent, {
        width: '650px',
        data: this.dossier
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result){
          console.log(result);
          this.dossier = result;
          this.receptacle.unshift(this.dossier);
          this.dataSource = this.receptacle;
          this.dataSource = new MatTableDataSource<Dossier>(this.receptacle);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          console.log('données non disponibles');
        }

      });

    }else {
      console.log('Vous n\'êtes pas autorisé');
    }


  }

  redirectToDelete(id: any) {
    if (this.ROLE_NAME === 'ROLE_EMPLOYE'){

      this.dialogService.openConfirmDialog('Voulez-vous supprimer le dossier ?')
        .afterClosed().subscribe(res => {
        if (res){
          console.log(res);
          this.dossierService.supprimerDossier(id).subscribe(data => {
            this._snackBar.open('Succès de l\'opération!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: 'top',

            });
          });

        }
      });

    }else {
      this.error = 'Vous n\'êtes pas autorisé à supprimer le dossier';
      // this.router.navigate(['service']);
    }
    this.router.navigate(['dossier']);
  }

  redirectToUpdate(id: number) {
    console.log(id);
    if (this.ROLE_NAME === 'ROLE_EMPLOYE'){
      const dialogRef = this.dialog.open(UpdateDossierComponent, {
        data: {
          dossier: id
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
    }else{
      this.error = 'Vous n\'êtes pas autorisé à modifier  le dossier!';
    }

  }

  applyFilter($event: KeyboardEvent) {

  }
  openDocDossier(id: number) {
    console.log(id);
    if (this.ROLE_NAME === 'ROLE_EMPLOYE'){
      const dialogRef = this.dialog.open(DocsduDossierComponent, {
        data: {
          dossier: id
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
    }else{
      this.error = 'Vous n\'êtes pas autorisé à modifier  le dossier!';
    }

  }
}
