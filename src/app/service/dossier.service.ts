import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable} from "rxjs";
import {Resultat} from "../model/resultat";
import {Departement} from "../model/Departement";
import {environment} from "../../environments/environment";
import {Dossier} from "../model/Dossier";
import {InfoDoc} from "../model/InfoDoc";

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getAllDossier(): Observable<Resultat<Dossier[]>> {
    return this.http.get<Resultat<Dossier[]>>(`${environment.apiUrl}/api/dossier`);
  }
  ajoutDossier(dossier: Dossier): Observable<Resultat<Dossier>> {
    console.log('methode du service qui ajoute un dossier', dossier);
    return this.http.post<Resultat<Dossier>>(`${environment.apiUrl}/api/dossier`, dossier);
  }
  getDossierById(id: number): Observable<Resultat<Dossier>> {
    return this.http.get<Resultat<Departement>>(`${environment.apiUrl}/api/dossier/${id}`);
  }
  getDossierByDep(id: number): Observable<Resultat<Dossier[]>> {
    return this.http.get<Resultat<Dossier[]>>(`${environment.apiUrl}/api/getDossierByidDep/${id}`);
  }

  modifDossier(dossier: Dossier): Observable<Resultat<Dossier>> {
    console.log('methode du service qui modifier dossier', dossier);
    return this.http.put<Resultat<Dossier>>(`${environment.apiUrl}/api/dossier`, dossier);
  }
  supprimerDossier(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/dossier/${id}`);

  }
}
