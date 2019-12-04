//  Angular

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { isNullOrUndefined } from "util";

import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { EnvService } from "shared/services";
import { UserSelectionModel, MainCallEntryModel } from "shared/models";
@Injectable({
  providedIn: "root"
})
export class MainCallEntryService {
  constructor(private http: HttpClient, private env: EnvService) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  getReportList(userSelection: UserSelectionModel): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");

    const url_api = `${
      this.env.loopbackApiUrl
      }/api/InvReports/mainCallEntryReport?access_token=${accessToken}`;

    const res = this.http
      .post(url_api, userSelection, {
        headers: this.headers
      })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
    return res;
  }

  getResumeStats(userSelection: UserSelectionModel): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");;

    const url_api = `${
      this.env.loopbackApiUrl
      }/api/InvReports/mainStatsReport?access_token=${accessToken}`;

    const res = this.http
      .post(url_api, userSelection, {
        headers: this.headers
      })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
    return res;
  }


  ping(): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");

    const url_api = `${
      this.env.loopbackApiUrl
      }/api/InvReports/ping?access_token=${accessToken}`;


    const res = this.http
      .post(url_api, {
        headers: this.headers
      })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
    return res;
  }

}
