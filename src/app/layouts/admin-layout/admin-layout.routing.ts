import {Routes} from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ListeDepartementComponent} from '../../departement/liste-departement/liste-departement.component';
import {ListeEmployeComponent} from '../../employe/liste-employe/liste-employe.component';
import {StatistiqueComponent} from "../../statistique/statistique/statistique.component";



export const AdminLayoutRoutes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'service', component: ListeDepartementComponent },
  { path: 'employe', component: ListeEmployeComponent },
  { path: 'statistique', component: StatistiqueComponent },
];
