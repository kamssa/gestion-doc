import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { ConnexionComponent } from './connexion/connexion.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListDocumentComponent } from './document/list-document/list-document.component';
import { EditDocumentComponent } from './document/edit-document/edit-document.component';
import { DetailDocumentComponent } from './document/detail-document/detail-document.component';
import {DocumentComponent} from './document/document/document.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DocumentComponent,
    ConnexionComponent,
    ListDocumentComponent,
    EditDocumentComponent,
    DetailDocumentComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
