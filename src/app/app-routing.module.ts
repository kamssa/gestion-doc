import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './helper/auth-guard.service';
import {ConnexionComponent} from './connexion/connexion.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';


const routes: Routes = [
  { path: 'login', component: ConnexionComponent },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuardService],
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];



@NgModule({
  imports: [CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
