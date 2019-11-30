import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
registerLocaleData(localeEs, "es");
import { LOCALE_ID } from "@angular/core";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertModule } from "shared/modules/alert/alert.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import * as Chart from "chart.js";
import * as ChartDataLabels from "chartjs-plugin-datalabels";
import { ChartsModule as Ng2Charts } from "ng2-charts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";

import { SelectorModule } from "shared/modules/selector/selector.module";

import { ReportHeaderModule } from "sections/audit/src/shared/modules/report-header/report-header.module";
import { ReportFinderModule } from "sections/audit/src/shared/modules/report-finder/report-finder.module";


import { CurrentAgentsReportComponent } from "./current-agents-report.component";
import { CurrentAgentsReportRoutingModule } from "./current-agents-report-routing.module";

import { CurrentAgentsReportListComponent } from "./current-agents-report-list/current-agents-report-list.component";

@NgModule({
  declarations: [
    CurrentAgentsReportComponent,
    CurrentAgentsReportListComponent
  ],
  imports: [
    CommonModule,

    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgSelectModule,
    NgxDatatableModule,
    Ng2Charts,

    SelectorModule,
    ReportHeaderModule,
    ReportFinderModule,

    CurrentAgentsReportRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es" }]
})
export class CurrentAgentsReportModule { }
