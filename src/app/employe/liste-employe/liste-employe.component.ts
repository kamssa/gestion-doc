import {Component, OnInit, ViewChild} from '@angular/core';
import {AddEmployeComponent} from "../add-employe/add-employe.component";
import {MatTableDataSource} from "@angular/material/table";
import {Employe} from "../../model/Employe";
import {EmployeService} from "../../service/employe.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {UpdateDepartementComponent} from "../../departement/update-departement/update-departement.component";
import {Departement} from "../../model/Departement";
import {UpdateEmployeComponent} from "../update-employe/update-employe.component";
import {AuthService} from "../../service/auth.service";
import {ManagerService} from "../../service/manager.service";
import {DialogConfirmService} from "../../helper/dialog-confirm.service";
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-liste-employe',
  templateUrl: './liste-employe.component.html',
  styleUrls: ['./liste-employe.component.scss']
})
export class ListeEmployeComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'service', 'update', 'delete', 'employe'];
  dataSource: MatTableDataSource<Employe>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  employes: Employe[];
  employe: Employe;
  roles: [];
  ROLE_MANAGER: any;
  ROLE_NAME: string;
  receptacle: any = [];
  personne: any;
  error = '';
  test: Date = new Date();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private employeService: EmployeService,
              public dialog: MatDialog, private authService: AuthService,
              private managerService: ManagerService,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar, private router: Router) {
  }
  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    console.log('localstorage dans la nav bar', currentUser.body.body.accessToken);
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(currentUser.body.body.accessToken);
    console.log('voir id dans nav bar', decoded.sub);
    this.managerService.getPersonneById(decoded.sub).subscribe(result => {
      this.personne = result.body;
      this.roles = result.body.roles;
      console.log('personne departement voir id', this.personne);
      console.log(this.roles);
      this.roles.forEach(val => {
        this.ROLE_MANAGER = val;
        this.ROLE_NAME = this.ROLE_MANAGER.name;
        console.log(this.ROLE_NAME);
      });
    }),
    this.employeService.getAllEmploye().subscribe(data => {
      this.employes = data.body;
      console.log('employes', this.employes);
      this.employes.forEach(value => {
        let opp : Employe = value;

        this.receptacle.push(opp);
      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Employe>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
    const dialogRef = this.dialog.open(AddEmployeComponent, {
      width: '650px',
      data: this.employe
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.employe = result;
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.employe = result;
      this.receptacle.unshift(this.employe);
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Employe>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    const dialogRef = this.dialog.open(UpdateEmployeComponent,{
      data: {
        employe: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.employe = result;
      // this.receptacle
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Employe>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
  }
  redirectToDelete(id: any) {
    if (this.ROLE_NAME === 'ROLE_MANAGER'){

      this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
        .afterClosed().subscribe(res => {
        if (res){
          console.log(res);
          this.employeService.supprimerEmploye(id).subscribe(data => {
            this._snackBar.open('Succès de l\'opération!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: 'top',

            });
          });

        }
      });

    }else {
      this.error = 'Vous n\'êtes pas autorisé';
      // this.router.navigate(['service']);
    }
    this.router.navigate(['employe']);
  }

}
