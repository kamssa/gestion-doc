import {Component, OnInit, ViewChild} from '@angular/core';
import {AddDepartementComponent} from "../add-departement/add-departement.component";
import {MatTableDataSource} from "@angular/material/table";
import {Departement} from "../../model/Departement";
import {MatDialog} from "@angular/material/dialog";
import {DepartementService} from "../../service/departement.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

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
  receptacle: any = [];
  test : Date = new Date();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private departementService: DepartementService,
              public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.departementService.getAllDepartement().subscribe(data => {
      this.departements = data.body;
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

  removeColumn() {

  }

  shuffle() {
    console.log('');
  }

  applyFilter($event: KeyboardEvent) {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDepartementComponent, {
      width: '650px',
      data: this.departement
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.departement = result;
    });
  }
  redirectToUpdate(id: any) {

  }
  redirectToDelete(id: any) {

  }
  redirectToFormation(id: number) {

  }

}
