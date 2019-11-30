import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';


import { HeaderComponent } from './header.component';




import { HeaderMenuOperationComponent } from './header-menu-operation/header-menu-operation.component';
import { HeaderMenuDataComponent } from './header-menu-data/header-menu-data.component';
import { HeaderMenuCallsComponent } from './header-menu-calls/header-menu-calls.component';
import { HeaderMenuAgentsComponent } from './header-menu-agents/header-menu-agents.component';

import { HttpClientModule } from "@angular/common/http";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";


import { HeaderMenuUserModule } from "shared/modules/header-menu-user/header-menu-user.module";
import { HeaderMenuBrandModule } from "shared/modules/header-menu-brand/header-menu-brand.module";

import { HeaderMenuLoginComponent } from './header-menu-login/header-menu-login.component';

@NgModule({
  declarations: [HeaderComponent, HeaderMenuAgentsComponent,
    HeaderMenuCallsComponent,
    HeaderMenuDataComponent,
    HeaderMenuOperationComponent, HeaderMenuLoginComponent
  ],
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
  exports: [HeaderComponent, HeaderMenuAgentsComponent,
    HeaderMenuCallsComponent,
    HeaderMenuDataComponent,
    HeaderMenuOperationComponent,
  ],
})
export class HeaderModule { }
