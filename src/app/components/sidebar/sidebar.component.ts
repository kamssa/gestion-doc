import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {StorageMap} from "@ngx-pwa/local-storage";
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Gestion de documents',  icon: 'folder', class: '' },
  { path: '/service', title: 'Création de Services',  icon: 'business', class: '' },
  { path: '/employe', title: 'Création d\'employés',  icon: 'personne', class: '' },

];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService,
              private router: Router,  private storage: StorageMap) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout() {
    this.authService.logout();
    this.storage.clear();
    this.router.navigate(['/login']);
  }
}
