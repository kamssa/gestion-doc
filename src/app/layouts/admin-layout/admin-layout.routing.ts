import {Routes} from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ListeDepartementComponent} from '../../departement/liste-departement/liste-departement.component';
import {ListeEmployeComponent} from '../../employe/liste-employe/liste-employe.component';
import {StatistiqueComponent} from "../../statistique/statistique/statistique.component";
import {ListParkerbaseComponent} from "../../parkerbase/list-parkerbase/list-parkerbase.component";
import {ListDossierComponent} from "../../dossiers/list-dossier/list-dossier.component";



export const AdminLayoutRoutes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'parkerbase', component: ListParkerbaseComponent },
  { path: 'service', component: ListeDepartementComponent },
  { path: 'dossier', component: ListDossierComponent },
  { path: 'employe', component: ListeEmployeComponent },
  { path: 'statistique', component: StatistiqueComponent },
];
