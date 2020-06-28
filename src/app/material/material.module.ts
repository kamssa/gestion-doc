import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatChipsModule} from "@angular/material/chips";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

const  materialComponents = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatButtonModule,
  MatCardModule,
  MatSidenavModule,
  MatProgressBarModule,
  MatSelectModule,
  MatExpansionModule,
  MatChipsModule,
  MatSnackBarModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule

];

@NgModule({
  declarations: [],
  imports: [
    materialComponents
  ],
  exports : [
   materialComponents
  ]

})
export class MaterialModule { }
