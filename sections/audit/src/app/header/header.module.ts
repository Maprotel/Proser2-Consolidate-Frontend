import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { HeaderRoutingModule } from './header-routing.module';


import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { HeaderMenuUserModule } from "shared/modules/header-menu-user/header-menu-user.module";
import { HeaderMenuBrandModule } from "shared/modules/header-menu-brand/header-menu-brand.module";

import { HeaderComponent } from './header.component';
import { HeaderMenuReportsComponent } from './header-menu-reports/header-menu-reports.component';
import { HeaderMenuLoginComponent } from './header-menu-login/header-menu-login.component';
@NgModule({
  declarations: [HeaderComponent, HeaderMenuReportsComponent, HeaderMenuLoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,

    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),

    FontAwesomeModule,

    HeaderMenuUserModule,
    HeaderMenuBrandModule,

    HeaderRoutingModule
  ],
  exports: [HeaderComponent, HeaderMenuReportsComponent],
})
export class HeaderModule { }
