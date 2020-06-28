import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  docForm: FormGroup;
  editMode: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){

  }
  annuler(){

  }
}
