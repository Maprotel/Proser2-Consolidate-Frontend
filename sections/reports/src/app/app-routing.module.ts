// Angular
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// Custom
import { AuthGuard } from "shared/guards";
import { RedirectModule } from "shared/modules/redirect/redirect.module";
// Components
import { HomeComponent } from "./pages/home/home.component";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./layout/layout.component";
//
import { LoginComponent } from './pages/login/login.component';
import { ByeComponent } from './pages/bye/bye.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';



const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        component: HomeComponent
      },

      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "bye",
        component: ByeComponent
      },
      {
        path: "layout",
        loadChildren: () =>
          import("./layout/layout.module").then(m => m.LayoutModule)
      }
    ]
  },

  { path: "not-found", component: NotfoundComponent },
  // NAVIGATE TO NOT FOUND PAGE
  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RedirectModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
