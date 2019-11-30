import { Injectable } from "@angular/core";

// Host
// export const host: string = "http://127.0.0.1/";
@Injectable(
)
export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by env.js

  // const host: string = "http://127.0.0.1/";

  public host = "http://localhost:4200";
  public home = "http://localhost:4200";
  public externalAssets = '/assets'

  public auditLink = this.host + '/proser_reports/dist/audit/'
  public crudLink = this.host + '/proser_reports/dist/crud/'
  public dashboardLink = this.host + '/proser_reports/dist/dashboard/'
  public displayLink = this.host + '/proser_reports/dist/display/'
  public homeLink = this.host + '/proser_reports/dist/home/'
  public reportsLink = this.host + '/proser_reports/dist/reports/'
  public smsLink = this.host + '/proser_reports/dist/sms/'
  public systemLink = this.host + '/proser_reports/dist/system/'
  public userLink = this.host + '/proser_reports/dist/user/'
  public viewLink = this.host + '/proser_reports/dist/view/'

  // API url
  public loopbackApiUrl = "http://localhost:3151";
  public systemApiUrl = "http://localhost:3152";
  public userApiUrl = "http://localhost:3153";

  // Version
  public version = "2.3.8";

  // Callcenter Name
  public callcenterName = "Test CallCenter";

  // Callcenter slogan
  public callcenterSlogan = "Proser is the best";

  // Callcenter slogan
  public callcenterLogo = "/assets/img/logos_proser/proser-icon-sm.png";

  // Callcenter slogan
  public callcenterSite = "Test";

  // Whether or not to enable debug mode
  public enableDebug = true;

  public waitTime = 20;

  public external = "External file";

  // Show/Hide Register user option
  public autoregister = true;


  constructor() { }
}
