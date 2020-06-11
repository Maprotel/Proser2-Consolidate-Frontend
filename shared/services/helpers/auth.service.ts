
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { isNullOrUndefined } from "util";

import { EnvService } from "../helpers/env.service";

import { Router } from "@angular/router";
import {
  UserSelectionModel,
  RoleMappingModel,
  UserbaseModel,
} from "shared/models";




@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private env: EnvService,
    private router: Router,

  ) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  // Register User in Database
  registerUser(user) {
    const url_api = `${this.env.loopbackApiUrl}/api/userbases`;
    return this.http
      .post<UserbaseModel>(url_api, user, { headers: this.headers })
      .pipe(map(data => data));
  }

  // Register Role to user
  registerRoleMapping(user: UserbaseModel) {
    let roleMapping = {
      principalType: "USER",
      principalId: user.id,
      roleId: 4
    };

    const url_api = `${this.env.loopbackApiUrl}/api/RoleMappings`;
    return this.http
      .post<RoleMappingModel>(url_api, roleMapping, { headers: this.headers })
      .pipe(map(data => data));
  }

  // Login user
  loginUser(username: string, password: string) {
    const url_api = `${this.env.loopbackApiUrl}/api/userbases/login?include=user`;
    return this.http
      .post<UserbaseModel>(
        url_api,
        { username, password },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  // logout from backend
  logoutUser() {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/userbases/logout?access_token=${accessToken}`;
    this.router.navigate(["/bye"]);
    localStorage.clear();
    return this.http.post<UserbaseModel>(url_api, { headers: this.headers });
  }

  // List all users
  getAllUsers() {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/userbases?access_token=${accessToken}`;
    return this.http
      .get<UserbaseModel>(url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  // Check in database if user exists
  checkIfExists(user) {
    const accessToken = localStorage.getItem("accessToken");


    const url_api = `${this.env.loopbackApiUrl}/api/Userbases/checkIfExists`;
    console.log('url_api check', user, url_api);
    return this.http
      .post<any>(url_api, user, { headers: this.headers })
      .pipe(map(data => data));
  }

  // Check if access token is present in local store
  isAuthenticated(): boolean {
    let result = false;
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      result = true;
    }

    return result;
  }


  /* SETTERS ****************** */

  // Record user in local store
  setUser(user: UserbaseModel) {
    const userString = JSON.stringify(user);
    localStorage.setItem("currentUser", userString);
  }

  // Record token in local store
  setToken(token) {
    localStorage.setItem("accessToken", token);
    // this.setProserStore();

    this.setProserStoreHistoric();
    this.setProserStoreCurrent();
  }

  // Record proser_historic & proser_current in local store
  setProserStore() {
    const proser_historic = {
      userSelection: new UserSelectionModel("standard")
    };

    const proser_current = {
      userSelection: new UserSelectionModel("standard")
    };

    const menuOptions = {
      userSelection: new UserSelectionModel("menuOptions")
    };

    proser_historic.userSelection.mode = {
      id: 1,
      name: "Histórico",
      value: "historic"
    };

    proser_current.userSelection.mode = {
      id: 0,
      name: "Actual",
      value: "actual"
    };

    localStorage.setItem("proser_historic", JSON.stringify(proser_historic));
    localStorage.setItem("proser_current", JSON.stringify(proser_historic));
    localStorage.setItem("menuOptions", JSON.stringify(menuOptions));
  }

  // Record proser_historic in local store
  setProserStoreHistoric() {
    const proser_historic = {
      userSelection: new UserSelectionModel("standard")
    };
    proser_historic.userSelection.mode = {
      id: 1,
      name: "Histórico",
      value: "historic"
    };

    localStorage.setItem("proser_historic", JSON.stringify(proser_historic));
  }

  // Record proser_current in local store
  setProserStoreCurrent() {
    const proser_current = {
      userSelection: new UserSelectionModel("standard")
    };
    proser_current.userSelection.mode = {
      id: 0,
      name: "Actual",
      value: "actual"
    };
    localStorage.setItem("proser_current", JSON.stringify(proser_current));
  }

  // Record proser_current in local store
  setProserStoreMenuOptions() {
    const menuOptions = {
      userSelection: new UserSelectionModel("menuOptions")
    };
    localStorage.setItem("menuOptions", JSON.stringify(menuOptions));
  }

  /* GETTERS****************** */

  // Read token from local_store
  getToken() {
    return localStorage.getItem("accessToken");
  }

  // Read user from local_store
  getCurrentUser(): UserbaseModel {
    const userString = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(userString)) {
      const user: UserbaseModel = JSON.parse(userString);
      return user;
    } else {
      return null;
    }
  }

  // Read user value from local_store
  getCurrentUserValue() {
    let result = 0;
    const userString = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(userString)) {
      const user: UserbaseModel = JSON.parse(userString);
      user.profile === "develop" ? (result = 20) : "";
      user.profile === "admin" ? (result = 10) : "";
      user.profile === "system" ? (result = 7) : "";
      user.profile === "config" ? (result = 5) : "";
      user.profile === "user" ? (result = 1) : "";
      user.profile === "guest" ? (result = 0) : "";
      return result;
    } else {
      return 0;
    }
  }
}
