import { Component, OnInit } from '@angular/core';

import {Manager} from "../model/Manager";
import {Employe} from "../model/Employe";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ManagerService} from "../service/manager.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  manager: Manager;
  employe: Employe;
  personne: any;
  test: Date = new Date();
constructor(private router: Router,
            private authService: AuthService, private managerService: ManagerService) {

}
ngOnInit(): void {

}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
