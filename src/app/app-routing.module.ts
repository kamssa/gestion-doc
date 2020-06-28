import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConnexionComponent} from './connexion/connexion.component';
import {DocumentComponent} from './document/document/document.component';


const routes: Routes = [
  {path: 'document', component: DocumentComponent},
  {path: '', component: DocumentComponent},
  {path: 'connexion', component: ConnexionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
