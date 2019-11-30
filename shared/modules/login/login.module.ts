import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccessdeniedComponent } from "./pages/accessdenied/accessdenied.component";
import { ErrorComponent } from "./pages/error/error.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";
import { LoginRoutingModule } from "./r./login-routing.module

@NgModule({
  declarations: [AccessdeniedComponent, ErrorComponent, NotfoundComponent],
  imports: [CommonModule, LoginRoutingModule],
  exports: [AccessdeniedComponent, ErrorComponent, NotfoundComponent]
})
export class LoginModule {}
