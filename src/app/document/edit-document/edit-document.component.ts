import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})
export class EditDocumentComponent implements OnInit {

  docForm: FormGroup;
  editMode: boolean;
  constructor(private  fb: FormBuilder) { }

  ngOnInit(){
    this.initForm();
  }
  initForm(){
   this.docForm =  this.fb.group({
     libelle: '',
     document: ''
   });
  }
  onSubmit(){
    const  formValue = this.docForm.value;
    console.log(formValue);

  }
  annuler(){

  }

}
