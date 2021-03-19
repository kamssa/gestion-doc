import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AdminLayoutComponent} from './admin-layout.component';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ComponentsModule} from '../../components/components.module';
import {DocumentComponent} from '../../document/document/document.component';
import {EditDocumentComponent} from '../../document/edit-document/edit-document.component';
import {ListDocumentComponent} from '../../document/list-document/list-document.component';
import {MaterialModule} from '../../material/material.module';
import {ConnexionComponent} from '../../connexion/connexion.component';
import {DepartementComponent} from "../../departement/departement/departement.component";
import {AddDepartementComponent} from "../../departement/add-departement/add-departement.component";
import {AddEmployeComponent} from "../../employe/add-employe/add-employe.component";
import {SuccessDialogComponent} from "../../service/shared/dialogs/success-dialog/success-dialog.component";
import {ErrorDialogComponent} from "../../service/shared/dialogs/error-dialog/error-dialog.component";




@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    DocumentComponent,
    EditDocumentComponent,
    ListDocumentComponent,
    DepartementComponent,
    AddDepartementComponent,
    AddEmployeComponent,
    SuccessDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ComponentsModule,
    MaterialModule,

  ]
})
export class AdminLayoutModule { }
