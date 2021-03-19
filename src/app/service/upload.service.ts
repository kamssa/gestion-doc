import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {InfoDoc} from '../model/InfoDoc';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class UploadService {

// observables sources
  private travauxCreerSource = new Subject<Resultat<InfoDoc>>();
  private travauxModifSource = new Subject<Resultat<InfoDoc>>();
  private travauxFiltreSource = new Subject<string>();
  private travauxSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.travauxCreerSource.asObservable();
  travauxModif$ = this.travauxModifSource.asObservable();
  travauxFiltre$ = this.travauxFiltreSource.asObservable();
  travauxSupprime$ = this.travauxSupprimeSource.asObservable();
  constructor(private httpClient: HttpClient, private  messageService: MessageService) {
  }
  getAllInfoDoc(): Observable<Resultat<InfoDoc[]>> {
    return this.httpClient.get<Resultat<InfoDoc[]>>(`${environment.apiUrl}/api/infoDoc`);
  }

  ajoutInfoDoc(infoDoc: InfoDoc): Observable<Resultat<InfoDoc>> {
    console.log('methode du service qui ajoute une information sur le document', infoDoc);
    return this.httpClient.post<Resultat<InfoDoc>>(`${environment.apiUrl}/api/infoDoc`, infoDoc);
  }
  modifInfoDoc(infoDoc: InfoDoc): Observable<Resultat<InfoDoc>> {
    console.log('methode du service qui modifie une information sur le document', infoDoc);
    return this.httpClient.put<Resultat<InfoDoc>>(`${environment.apiUrl}/api/infoDoc`, infoDoc);
  }
  getDocById(id: number): Observable<Resultat<InfoDoc>> {
    return this.httpClient.get<Resultat<InfoDoc>>(`${environment.apiUrl}/api/infoDoc/${id}`);
  }
  getDocByIdDep(id: number): Observable<Resultat<InfoDoc[]>> {
    return this.httpClient.get<Resultat<InfoDoc[]>>(`${environment.apiUrl}/api/infoDocParDep/${id}`);
  }
  getDocByIdEntre(id: number): Observable<Resultat<InfoDoc[]>> {
    return this.httpClient.get<Resultat<InfoDoc[]>>(`${environment.apiUrl}/api/infoDocParEntreprise/${id}`);
  }
  supprimerDocById(id: number): Observable<Resultat<boolean>> {
    return this.httpClient.delete<Resultat<boolean>>(`${environment.apiUrl}/api/infoDoc/${id}`);
  }
  rechercheInfoParMc(mc: string, id: number): Observable<Array<InfoDoc>> {
    return this.httpClient.get<Resultat<Array<InfoDoc>>>(`${environment.apiUrl}/api/rechemc/?mc=${mc}&id=${id}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`InfoDoc trouve =${res}`))),
        catchError(this.handleError<Array<InfoDoc>>('rechercheInfoDocParMc'))
      );

  }
  rechercheInfoParEntreMc(mc: string, id: number): Observable<Array<InfoDoc>> {
    return this.httpClient.get<Resultat<Array<InfoDoc>>>(`${environment.apiUrl}/api/recheParentreprisemc/?mc=${mc}&id=${id}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`InfoDoc trouve =${res}`))),
        catchError(this.handleError<Array<InfoDoc>>('rechercheInfoParEntreMc'))
      );

  }
  upload(id: number, formData): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/file/upload/?id=${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }
  download(id: number, keyname: string): Observable<any> {
     // this.httpClient.get<Observable<any>>(`${environment.apiUrl}/api/file/download/?depName=${depName}&keyname=${keyname}`);
      const req = new HttpRequest('GET', `${environment.apiUrl}/api/file/download/?id=${id}&keyname=${keyname}`, {
        responseType: 'application/octet-stream'
    });

      return this.httpClient.request(req);
  }
 /* getFiles(): Observable<any> {
    return this.httpClient.get(`${environment}/files`);
  }*/
  travauxCreer(res: Resultat<InfoDoc>) {
    console.log('Travail a ete  creer correctement essaie source');
    this.travauxCreerSource.next(res);
  }

  abonnesModif(res: Resultat<InfoDoc>) {
    this.travauxModifSource.next(res);
  }

  filtreTravaux(text: string) {
    this.travauxFiltreSource.next(text);
  }

  travauxsupprime(res: Resultat<boolean>) {
    this.travauxSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('travauxService: ' + message);

  }

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
