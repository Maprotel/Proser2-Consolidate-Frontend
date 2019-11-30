// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";


// Vendor
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CollapseModule } from "ngx-bootstrap/collapse";


// Custom modules
import { HeaderRoutingModule } from './header-routing.module';
import { HeaderMenuUserModule } from "shared/modules/header-menu-user/header-menu-user.module";
import { HeaderMenuBrandModule } from "shared/modules/header-menu-brand/header-menu-brand.module";


// Components
import { HeaderComponent } from './header.component';

import { HeaderMenuLoginComponent } from './header-menu-login/header-menu-login.component';

import { HeaderMenuSectionsComponent } from './header-menu-sections/header-menu-sections.component';

@NgModule({
  declarations: [HeaderComponent, HeaderMenuSectionsComponent, HeaderMenuLoginComponent],
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
  exports: [HeaderComponent, HeaderMenuSectionsComponent],
})
export class HeaderModule { }
