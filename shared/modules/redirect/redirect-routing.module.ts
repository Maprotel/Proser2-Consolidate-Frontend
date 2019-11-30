
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "shared/guards";

import { AccessdeniedComponent } from "./pages/accessdenied/accessdenied.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";
import { ErrorComponent } from "./pages/error/error.component";

import { ByeComponent } from './pages/bye/bye.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [

  { path: "redirect-login", component: LoginComponent },
  { path: "redirect-profile", component: ProfileComponent },
  { path: "redirect-register", component: RegisterComponent },
  { path: "redirect-bye", component: ByeComponent },

  { path: "access-denied", component: AccessdeniedComponent },
  { path: "not-found", component: NotfoundComponent },
  { path: "error", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RedirectRoutingModule { }
