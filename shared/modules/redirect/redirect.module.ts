import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccessdeniedComponent } from "./pages/accessdenied/accessdenied.component";
import { ErrorComponent } from "./pages/error/error.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";
import { RedirectRoutingModule } from "./redirect-routing.module";

import { ByeComponent } from './pages/bye/bye.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';


import { IntroPageModule } from "shared/modules/intro-page/intro-page.module";

import { AuthGuard } from "shared/guards";
import { AlertService } from "shared/services/helpers/alert.service";
import { AlertModule } from "shared/modules/";
import { EnvServiceProvider } from "shared/services/helpers/env.service.provider";

import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
@NgModule({
  declarations: [

    ByeComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,

    AccessdeniedComponent,
    ErrorComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    IntroPageModule,
    AlertModule,

    FormsModule, ReactiveFormsModule, HttpClientModule,

    RedirectRoutingModule
  ],
  providers: [
    EnvServiceProvider,
    AuthGuard,
    AlertService,
    {
      provide: "externalUrlRedirectResolver",
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      }
    }
  ],
  exports: [

    ByeComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,

    AccessdeniedComponent,
    ErrorComponent,
    NotfoundComponent
  ]
})
export class RedirectModule { }
