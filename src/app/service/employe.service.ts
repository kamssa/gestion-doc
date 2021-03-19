import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../model/resultat";
import {Manager} from "../model/Manager";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Departement} from "../model/Departement";
import {environment} from "../../environments/environment";
import {Employe} from "../model/Employe";
import {Personne} from "../model/Personne";

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private employeCreerSource = new Subject<Resultat<Manager>>();
  private employeModifSource = new Subject<Resultat<Manager>>();
  private employeFiltreSource = new Subject<string>();
  private employeSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  employeCreer$ = this.employeCreerSource.asObservable();
  employeModif$ = this.employeModifSource.asObservable();
  employeFiltre$ = this.employeFiltreSource.asObservable();
  employeSupprime$ = this.employeSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getAllEmploye(): Observable<Resultat<Employe[]>> {
    return this.http.get<Resultat<Employe[]>>(`${environment.apiUrl}/api/auth/employe`);
  }
  ajoutEmploye(employe: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui ajoute un employe', employe);
    return this.http.post<Resultat<Employe>>(`${environment.apiUrl}/api/auth/signupEmpl`, employe);
  }
  getEmployeById(id: number): Observable<Resultat<Personne>> {
    return this.http.get<Resultat<Personne>>(`${environment.apiUrl}/api/auth/employe/${id}`);
  }
  modifEmploye(employe: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui modifier employe', employe);
    return this.http.put<Resultat<Employe>>(`${environment.apiUrl}/api/auth/employe`, employe);
  }
  getEmplByIdEntreprise(id: number): Observable<Resultat<Employe[]>> {
    return this.http.get<Resultat<Employe[]>>(`${environment.apiUrl}/api/auth/getEmployeByidEntreprise/${id}`);
  }

  supprimerEmploye(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/auth/employe/${id}`);

  }
  employeCreer(res: Resultat<Employe>) {
    console.log('Employe a ete  creer correctement essaie source');
    this.employeCreerSource.next(res);
  }

  employeModif(res: Resultat<Employe>) {
    this.employeModifSource.next(res);
  }

  filtreEmploye(text: string) {
    this.employeFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('EmployeService: ' + message);

  }
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  // recuper les erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }
}
