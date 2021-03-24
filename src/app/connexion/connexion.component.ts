import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {Manager} from '../model/Manager';
import {ManagerService} from '../service/manager.service';
import {Employe} from '../model/Employe';
import {Personne} from "../model/Personne";
import {EmployeService} from "../service/employe.service";
declare const $: any;

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  managerForm: FormGroup;
  employeForm: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  personne: Personne;
  submitted = false;
  loading = false;
  error = '';
  result: any;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isuAth: boolean;
  manager: Manager;
  employe: Employe;
  test: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private managerService: ManagerService,
    private employeService: EmployeService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.initFormempl();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
// convenience getter for easy access to form fields
  get f() {
    return this.managerForm.controls;
  }
  initForm() {
    this.managerForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

  }
  initFormempl() {
    this.employeForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    this.submitted = true;
    const mail = this.managerForm.get('email').value;
    if (mail){
      this.managerService.getPersonneByEmail(mail).subscribe(data => {
        const email = data.body.email;
        const password = this.managerForm.get('password').value;
        // this.loading = true;
        this.personne = data.body;
        console.log(this.personne.type);
        this.loading = true;
        if (data.body.type === 'Manager'){
          console.log('le type est:', data.body.type);
          let  manager : Manager = {
            email: email,
            password: password,
            type:'MANAGER'
          };
          this.authService.login(manager).subscribe(res => {
              console.log('resultat manager', res.body);
              console.log('auth reussi', res.messages);
              if (res){
                this.router.navigate([this.returnUrl]);

              }

            },
            error => {
              this.error = "email ou mot de passe oublié";
              this.loading = false;
            });
        }
        else if (data.body.type === 'Employe'){
          console.log('le type est employe');
          let  employe : Employe = {
            email: email,
            password: password,
            type:'EMPLOYE'
          };
          this.authService.login(employe).subscribe(res => {
              console.log('resultat manager', res.body);
              console.log('auth reussi', res.messages);
              if (res){
                this.router.navigate([this.returnUrl]);
              }
            },
            error => {
              this.error = "email ou mot de passe oublié";
              this.loading = false;
            });
        }
      });
    }else {
      this.error = "Entrer votre email!";
    }

    this.router.navigate(['dashboard']);
  }

}
