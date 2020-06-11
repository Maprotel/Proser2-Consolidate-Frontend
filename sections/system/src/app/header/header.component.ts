import { Component, OnInit } from "@angular/core";

import { AuthService, AlertService } from "../../../../../shared/services";
import { AlertModel } from "../../../../../shared/models";

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
