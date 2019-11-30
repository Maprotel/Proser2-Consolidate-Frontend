// Angular
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

// Vendor
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

// Custom modules
import { IntroPageModule } from "shared/modules/intro-page/intro-page.module";
//
import { AlertModule } from "shared/modules/alert/alert.module";
import { NowModule } from "shared/modules/now/now.module";
import { ConnectionModule } from "shared/modules/connection/connection.module";
import { SelectorModule } from "shared/modules/selector/selector.module";
//
import { HeaderModule } from './header/header.module';
import { HeaderMenuModule } from "shared/modules/header-menu/header-menu.module";
import { HeaderMenuUserModule } from "shared/modules/header-menu-user/header-menu-user.module";
import { HeaderMenuBrandModule } from "shared/modules/header-menu-brand/header-menu-brand.module";
//
import { RedirectModule } from 'shared/modules/redirect/redirect.module';
// Routing
import { AppRoutingModule } from "./app-routing.module";

// Custom providers
import { AuthGuard } from "shared/guards";
import { AlertService } from "shared/services/helpers/alert.service";
import { EnvServiceProvider } from "shared/services/helpers/env.service.provider";
// Components
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from './pages/login/login.component';
import { ByeComponent } from './pages/bye/bye.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ByeComponent,
    NotfoundComponent,

  ],
  imports: [
    // Angular
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // Vendor
    NgbModule,
    SelectorModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    FontAwesomeModule,
    // Custom modules
    IntroPageModule,
    //
    AlertModule,
    NowModule,
    ConnectionModule,
    SelectorModule,
    //
    HeaderModule,
    HeaderMenuModule,
    HeaderMenuUserModule,
    HeaderMenuBrandModule,
    //
    RedirectModule,
    // Routing
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    EnvServiceProvider,
    {
      provide: "externalUrlRedirectResolver",
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

const providers = [];
@NgModule({})
export class AuditSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: providers
    };
  }
}
