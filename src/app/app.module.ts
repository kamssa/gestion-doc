import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {JwtInterceptor} from './helper/jwt.interceptor';
import {ErrorInterceptor} from './helper/error.interceptor';
import {ComponentsModule} from './components/components.module';
import {AdminLayoutModule} from './layouts/admin-layout/admin-layout.module';
import { ListeDepartementComponent } from './departement/liste-departement/liste-departement.component';
import { ListeEmployeComponent } from './employe/liste-employe/liste-employe.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { StatistiqueComponent } from './statistique/statistique/statistique.component';
import {ConnexionComponent} from "./connexion/connexion.component";
import { UpdateDepartementComponent } from './departement/update-departement/update-departement.component';
import {MatConfirmDialogComponent} from "./service/shared/dialogs/mat-confirm-dialog/mat-confirm-dialog.component";
import { UpdateEmployeComponent } from './employe/update-employe/update-employe.component';
import { UpdateDocComponent } from './document/update-doc/update-doc.component';
import { ListParkerbaseComponent } from './parkerbase/list-parkerbase/list-parkerbase.component';
import { UpdateParkerbaseComponent } from './parkerbase/update-parkerbase/update-parkerbase.component';
import { ListDossierComponent } from './dossiers/list-dossier/list-dossier.component';
import { UpdateDossierComponent } from './dossiers/update-dossier/update-dossier.component';
import { AddDossierComponent } from './dossiers/add-dossier/add-dossier.component';

@NgModule({
  declarations: [
    AppComponent,
    ListeDepartementComponent,
    ListeEmployeComponent,
    StatistiqueComponent,
    ConnexionComponent,
    UpdateDepartementComponent,
    MatConfirmDialogComponent,
    UpdateEmployeComponent,
    UpdateDocComponent,
    ListParkerbaseComponent,
    UpdateParkerbaseComponent,
    ListDossierComponent,
    UpdateDossierComponent,
    AddDossierComponent
  ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        HttpClientModule,
        ComponentsModule,
        AdminLayoutModule,
        MatTableModule,
        MatPaginatorModule
    ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
