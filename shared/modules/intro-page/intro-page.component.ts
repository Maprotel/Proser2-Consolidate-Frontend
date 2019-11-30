import { Component, OnInit, Input } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { EnvService } from "shared/services/helpers/env.service";
import { AuthService } from "shared/services/helpers/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "intro-page",
  templateUrl: "./intro-page.component.html",
  styleUrls: ["./intro-page.component.scss"]
})
export class IntroPageComponent implements OnInit {
  @Input() title;
  @Input() version;
  env;
  currentUser;
  currentConfig;
  externalAssets;

  logo;
  img_01;
  img_02;
  img_03;
  img_04;

  constructor(
    private envService: EnvService,
    private authService: AuthService,
    private router: Router
  ) {
    this.env = this.envService;
    this.currentConfig = 1;
    this.externalAssets = this.env.externalAssets
    this.logo = `${this.externalAssets}/img/logos_client/client-logo.png`
    this.img_01 = `${this.externalAssets}/img/intro/portada-01.jpg`;
    this.img_02 = `${this.externalAssets}/img/intro/portada-02.jpg`;
    this.img_03 = `${this.externalAssets}/img/intro/portada-03.jpg`;
    this.img_04 = `${this.externalAssets}/img/intro/portada-04.jpg`;
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

  onLogin() {
    this.router.navigate(["/init/layout/login/"]);
  }

  onRegister() {
    this.router.navigate(["/init/layout/login/login-register/"]);
  }
}
