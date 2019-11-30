import { Component, OnInit } from "@angular/core";

import { AuthService } from "shared/services/helpers/auth.service";
import { AlertService } from "shared/services/helpers/alert.service";
import { AlertModel } from "shared/models/helpers/Alert";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  currentUser;
  visibleMenus;

  // *ngIf="currentUser"

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
    this.onGetCurrentUser()
  }

  onGetCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
    return this.currentUser
  }
}
