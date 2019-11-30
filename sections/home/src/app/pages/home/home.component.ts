import { Component, OnInit } from '@angular/core';

import { AuthService } from "shared/services/helpers/auth.service";
import { AlertService } from "shared/services/helpers/alert.service";
import { AlertModel } from "shared/models/helpers/Alert";

@Component({
  selector: 'login-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  visibleMenus;
  currentUser;
  showInMenu;

  constructor(
    private authService: AuthService,
    private alertService: AlertService) {

    this.currentUser = this.authService.getCurrentUser();

    this.visibleMenus = {
      loginMenu: true,
      sectionsMenus: false,
      userMenu: false
    }
  }

  ngOnInit() {
    this.onGetCurrentUser();
    this.onShowMenus();
    this.onShowSectionMenus();
  }

  onGetCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
    return this.currentUser
  }

  onShowMenus() {
    if (this.currentUser === null) {
      this.visibleMenus = {
        loginMenu: true,
        sectionsMenus: false,
        userMenu: false
      }
    }
    if (this.currentUser !== null) {
      this.visibleMenus = {
        loginMenu: false,
        sectionsMenus: true,
        userMenu: true
      }
    }
  }

  onShowSectionMenus() {
    this.showInMenu = this.authService.getCurrentUserValue()
  }

}
