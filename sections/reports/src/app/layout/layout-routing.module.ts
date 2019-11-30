import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "layout",
        component: LayoutComponent
      },

      {
        path: "audit-report",
        loadChildren: () =>
          import(
            "./reports/data-reports/audit-report/audit-report.module"
          ).then(m => m.AuditReportModule)
      },

      {
        path: "cdr-report",
        loadChildren: () =>
          import("./reports/data-reports/cdr-report/cdr-report.module").then(
            m => m.CdrReportModule
          )
      },

      {
        path: "call-entry-report",
        loadChildren: () =>
          import(
            "./reports/data-reports/call-entry-report/call-entry-report.module"
          ).then(m => m.CallEntryReportModule)
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
