import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { EnvService } from "shared/services/helpers/env.service";
import { UserSelectionModel } from "shared/models/";
import { stringifySelection } from "shared/functions";

import {
  selectorOptionSubtitles,
  selectorLegendSubtitles
} from "shared/functions";

@Injectable({
  providedIn: "root"
})
export class UserSelectionService {
  api_string = "/api/InvMenus";

  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");

  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient, private env: EnvService) {}

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  getUserSelectionMenus(
    selection: UserSelectionModel
  ): Observable<UserSelectionModel> {
    let query = JSON.stringify(selection);

    const accessToken = localStorage.getItem("accessToken");
    let filter;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = `?access_token=${accessToken}`;
    }
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/userSelectionMenu${filter}`;
    return this.http
      .post<UserSelectionModel>(url_api, query, { headers: this.headers })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }



  readUserSelectionHistoric(local_store?): UserSelectionModel {
    let userSelection = new UserSelectionModel();
    let proser_historic = { userSelection: userSelection };
    let proser_historic_temp;
    let userSelection_temp;

    try {
      proser_historic_temp = JSON.parse(
        localStorage.getItem(`proser_historic`)
      );
      userSelection_temp = proser_historic_temp["userSelection"];

      if (proser_historic_temp === null) {
        localStorage.setItem(
          `proser_historic`,
          JSON.stringify(proser_historic)
        );
      } else {
        proser_historic.userSelection = userSelection_temp;
        userSelection = userSelection_temp;
      }
    } catch (e) {
      userSelection = new UserSelectionModel();
      proser_historic = { userSelection: userSelection };
      localStorage.setItem(`proser_historic`, JSON.stringify(proser_historic));
    }
    return userSelection;
  }

  readUserSelectionCurrent(local_store?): UserSelectionModel {
    let userSelection = new UserSelectionModel();
    let proser_current = { userSelection: userSelection };
    let proser_current_temp;
    let userSelection_temp;

    try {
      proser_current_temp = JSON.parse(localStorage.getItem(`proser_current`));
      userSelection_temp = proser_current_temp["userSelection"];

      if (proser_current_temp === null) {
        localStorage.setItem(`proser_current`, JSON.stringify(proser_current));
      } else {
        proser_current.userSelection = userSelection_temp;
        userSelection = userSelection_temp;
      }
    } catch (e) {
      userSelection = new UserSelectionModel();
      proser_current = { userSelection: userSelection };
      localStorage.setItem(`proser_current`, JSON.stringify(proser_current));
    }
    return userSelection;
  }

  writeUserSelectionHistoric(userSelection) {


    let proser_historic = { userSelection };
    localStorage.setItem(`proser_historic`, JSON.stringify(proser_historic));

    return userSelection;
  }

  writeUserSelectionCurrent(userSelection) {
    let proser_current = { userSelection };
    localStorage.setItem(`proser_current`, JSON.stringify(proser_current));
    return userSelection;
  }


  writeMenuOptions() {
    let menuOptions = new UserSelectionModel('menuOptions');
    localStorage.setItem(
      `menuOptions`,
      JSON.stringify(menuOptions)
    );
  }

}
