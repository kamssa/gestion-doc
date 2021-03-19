import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  /*messages: string[] = [];*/

  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();

  constructor() {
  }


  add(message: string) {
    /*this.messages.push(message);*/
    this.messageSource.next(message);
  }

  /*clear() {
    this.messages = [];
  }*/
}
