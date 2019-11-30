import { Component, OnInit } from "@angular/core";

import { AuthService } from "shared/services/helpers/auth.service";

import { AlertService } from "shared/services/helpers/alert.service";
import { AlertModel } from "shared/models/helpers/Alert";

@Component({
  selector: 'redirect-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser;
  visibleMenus;
  showInMenu;


  alertMessage = new AlertModel();
  api_string = "/api/Userbases";

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authService.getCurrentUser();
    this.visibleMenus = {
      loginMenu: false,
      sectionsMenus: true,
      userMenu: true
    }
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

}
