import { Component, OnInit, Input } from "@angular/core";


import { AuthService } from "shared/services/helpers/auth.service";

import { Router } from "@angular/router";
import { logout } from "shared/functions";

import {
  AlertService,
  EnvService,
  UserSelectionService
} from "shared/services";


import {
  faDigitalTachograph,
  faChartArea,
  faSwatchbook,
  faMarker,
  faEye,
  faMagic,
  faUserTie,
  faLaptop
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'login-header-menu-sections',
  templateUrl: './header-menu-sections.component.html',
  styleUrls: ['./header-menu-sections.component.scss']
})
export class HeaderMenuSectionsComponent implements OnInit {
  showInMenu;
  @Input() currentUser;
  env;

  faDigitalTachograph = faDigitalTachograph;
  faChartArea = faChartArea;
  faSwatchbook = faSwatchbook;
  faMarker = faMarker;
  faEye = faEye;
  faMagic = faMagic;
  faUserTie = faUserTie;
  faLaptop = faLaptop;



  auditLink;
  crudLink;
  dashboardLink;
  displayLink;
  homeLink;
  reportsLink;
  smsLink;
  systemLink;
  userLink;
  viewLink;

  testLink

  host
  constructor(
    private authService: AuthService,
    private envService: EnvService,
    private router: Router

  ) {
    this.env = this.envService;
    this.host = this.envService.host;

    this.auditLink = this.env.auditLink
    this.crudLink = this.env.crudLink
    this.dashboardLink = this.env.dashboardLink
    this.displayLink = this.env.displayLink
    this.homeLink = this.env.homeLink
    this.reportsLink = this.env.reportsLink
    this.smsLink = this.env.smsLink
    this.systemLink = this.env.systemLink
    this.userLink = this.env.userLink
    this.viewLink = this.env.viewLink
  }

  ngOnInit() {
    this.onShowSectionMenus()
  }

  onLogout() {
    this.authService.logoutUser().subscribe(data => {
      this.router.navigate(["/"]);
    });
  }

  onShowSectionMenus() {
    this.showInMenu = this.authService.getCurrentUserValue()
  }
}
