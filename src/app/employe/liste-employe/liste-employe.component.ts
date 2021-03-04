import {Component, OnInit, ViewChild} from '@angular/core';
import {AddEmployeComponent} from "../add-employe/add-employe.component";
import {MatTableDataSource} from "@angular/material/table";
import {Employe} from "../../model/Employe";
import {EmployeService} from "../../service/employe.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-liste-employe',
  templateUrl: './liste-employe.component.html',
  styleUrls: ['./liste-employe.component.scss']
})
export class ListeEmployeComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'service', 'update', 'delete', 'employe'];
  dataSource: MatTableDataSource<Employe>;
  employes: Employe[];
  employe: Employe;
  receptacle: any = [];
  test: Date = new Date();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private employeService: EmployeService,
              public dialog: MatDialog) {
  }
  ngOnInit(): void {
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
  }
  redirectToUpdate(id: any) {

  }
  redirectToDelete(id: any) {

  }
  redirectToFormation(id: number) {

  }
}
