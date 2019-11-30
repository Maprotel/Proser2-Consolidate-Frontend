
import { Component, OnInit } from "@angular/core";
import { AuthService } from "shared/services/helpers/auth.service";
import { UserInterface } from "shared/models/pages/user-interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AlertModel } from "shared/models/helpers/Alert";

import { Router } from "@angular/router";
import { AlertService } from "shared/services/helpers/alert.service";
import { EnvService } from "shared/services/helpers/env.service";


import { UserSelectionService } from 'shared/services';
import { UserSelectionModel } from 'shared/models';


@Component({
  selector: 'redirect-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  visibleMenus;
  currentUser;
  showInMenu;

  option = "other";
  env;

  loginForm: FormGroup;
  submitted = false;
  alertMessage = new AlertModel();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private envService: EnvService,
    private alertService: AlertService,
    private router: Router,
    private userSelectionService: UserSelectionService
  ) {
    this.env = this.envService;

    this.visibleMenus = {
      loginMenu: true,
      sectionsMenus: false,
      userMenu: false
    }

    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }



  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.submitted = true;

    // console.error('data', this.loginForm.value);

    return this.authService
      .loginUser(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        data => {
          let temp = this.userCheck(data, this.option);
          this.authService.setUser(temp);
          this.authService.setToken(temp.accessToken);
          this.getUserSelectionMenus();
          this.router.navigate(["/"]);
        },
        error => {
          console.error("Error", error, error.status);
          this.alertService.error(error.status);
          this.alertMessage.alertTitle = "Error del servidor";
          this.alertMessage.alertText = error.statusText;
          this.alertMessage.alertShow = true;
          this.alertMessage.alertClass =
            "alert alert-danger alert-dismissible fade show";
        }
      );
  }

  userCheck(incomingUser, option) {
    let result;
    if (option === "jwt") {
      result = incomingUser;
    } else {
      result = {
        firstname: incomingUser.user.firstname,
        lastname: incomingUser.user.lastname,
        user_legal_id: incomingUser.user.user_legal_id,
        user_internal_id: incomingUser.user.user_internal_id,
        user_photo_path: incomingUser.user.user_photo_path,
        profile: incomingUser.user.profile,
        realm: incomingUser.user.realm,
        username: incomingUser.user.username,
        email: incomingUser.user.email,
        emailVerified: incomingUser.user.emailVerified,
        id: incomingUser.user.id,
        accessToken: incomingUser.id
      };
    }
    return result;
  }


  // store selection menus
  getUserSelectionMenus() {
    let selection = new UserSelectionModel("standard");
    this.userSelectionService
      .getUserSelectionMenus(selection)
      .subscribe(data => {
        let menuOptions = data;
        localStorage.setItem("menuOptions", JSON.stringify(menuOptions));
        error => {
          console.error('Error');
        };
      });
  }
}
