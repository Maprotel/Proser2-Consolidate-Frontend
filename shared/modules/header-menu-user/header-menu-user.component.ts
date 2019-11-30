import { EnvService } from "shared/services";
import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "shared/services/helpers/auth.service";

import { Router } from "@angular/router";

import {
  faIdBadge,
  faSignOutAlt,
  faUser
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "header-menu-user",
  templateUrl: "./header-menu-user.component.html",
  styleUrls: ["./header-menu-user.component.scss"]
})
export class HeaderMenuUserComponent implements OnInit {

  @Input() showInMenu;
  @Input() currentUser;
  // Icons
  faSignOutAlt = faSignOutAlt;
  faIdBadge = faIdBadge;
  faUser = faUser;

  env;

  constructor(
    private authService: AuthService,
    private router: Router,
    private envService: EnvService
  ) {
    this.env = this.envService;
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logoutUser().subscribe(data => {
      this.router.navigate(["/bye"]);
    });
    localStorage.clear();
  }

  onLogin() {
    this.router.navigate(["/login"]);
  }

  onProfile() {
    this.router.navigate(["/profile"]);
  }

}
