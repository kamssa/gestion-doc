import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AddDepartementComponent} from "../add-departement/add-departement.component";
import {MatTableDataSource} from "@angular/material/table";
import {Departement} from "../../model/Departement";
import {MatDialog} from "@angular/material/dialog";
import {DepartementService} from "../../service/departement.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../service/auth.service";
import {ManagerService} from "../../service/manager.service";
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";
import {DialogConfirmService} from "../../helper/dialog-confirm.service";
import {Router} from "@angular/router";
import {UpdateDepartementComponent} from "../update-departement/update-departement.component";

@Component({
  selector: 'app-liste-departement',
  templateUrl: './liste-departement.component.html',
  styleUrls: ['./liste-departement.component.scss']
})
export class ListeDepartementComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'update', 'delete', 'service'];
  dataSource: MatTableDataSource<Departement>;
  departements: Departement[];
  departement: Departement;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  roles: [];
  ROLE_MANAGER: any;
  ROLE_NAME: string;
  receptacle: any = [];
  personne: any;
  error = '';
  idEntreprise: number;
  test: Date = new Date();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private departementService: DepartementService,
              public dialog: MatDialog, private authService: AuthService,
              private managerService: ManagerService,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar, private router: Router,
              private changeDetectorRefs: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.changeDetectorRefs.detectChanges();
    const currentUser = this.authService.currentUserValue;
    console.log('localstorage dans la nav bar', currentUser.body.body.accessToken);
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(currentUser.body.body.accessToken);
    console.log('voir id dans nav bar', decoded.sub);
    this.managerService.getPersonneById(decoded.sub).subscribe(result => {
      this.personne = result.body;
      if (this.personne.entreprise){
        this.idEntreprise = this.personne.entreprise.id;
        console.log(this.idEntreprise);
        this.roles = result.body.roles;
        console.log('personne departement voir id', this.personne);
        console.log(this.roles);
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
        });
      }else if (this.personne.departement){
        this.idEntreprise = this.personne.departement.entreprise.id;
        console.log(this.idEntreprise);


        this.roles = result.body.roles;
        console.log('personne departement voir id', this.personne);
        console.log(this.roles);
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
        });
      }

    });

  }

  removeColumn() {

  }

  shuffle() {
    console.log('');
  }

  applyFilter($event: KeyboardEvent) {

  }

  openDialog(): void {
    if (this.ROLE_NAME === 'ROLE_MANAGER'){
      const dialogRef = this.dialog.open(AddDepartementComponent, {
        width: '650px',
        data: this.departement
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result){
          console.log(result);
          this.departement = result;
          this.receptacle.unshift(this.departement);
          this.dataSource = this.receptacle;
          this.dataSource = new MatTableDataSource<Departement>(this.receptacle);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          console.log('données non disponibles');
        }

      });
    }else{
      this.error = 'Vous n\'êtes pas autorisé à créer un service';
    }

  }
  redirectToUpdate(id: any) {
    console.log(id);
    if (this.ROLE_NAME === 'ROLE_MANAGER'){
      const dialogRef = this.dialog.open(UpdateDepartementComponent,{
        data: {
          departement: id
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
      this.error = 'Vous n\'êtes pas autorisé à modifier  le service!';
    }

  }
  redirectToDelete(id: any) {
    if (this.ROLE_NAME === 'ROLE_MANAGER'){

      this.dialogService.openConfirmDialog('Voulez-vous supprimer le service ?')
        .afterClosed().subscribe(res => {
        if (res){
          console.log(res);
          this.departementService.supprimerDepartement(id).subscribe(data => {
            this._snackBar.open('Succès de l\'opération!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: 'top',

            });
          });

        }
      });

    }else {
      this.error = 'Vous n\'êtes pas autorisé à supprimer le service';
      // this.router.navigate(['service']);
    }
    this.router.navigate(['service']);
  }
  redirectToFormation(id: number) {

  }

}
