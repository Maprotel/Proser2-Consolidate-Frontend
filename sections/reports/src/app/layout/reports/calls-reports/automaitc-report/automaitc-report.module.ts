
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

import { ReportHeaderModule } from "sections/reports/src/shared/modules/report-header/report-header.module";
import { ReportFinderModule } from "sections/reports/src/shared/modules/report-finder/report-finder.module";


import { AutomaitcReportRoutingModule } from "./automaitc-report-routing.module";
import { AutomaitcReportComponent } from "./automaitc-report.component";
import { AutomaitcReportListComponent } from "./automaitc-report-list/automaitc-report-list.component";

import { ExcelService } from 'sections/reports/src/shared/services';


@NgModule({
  declarations: [AutomaitcReportComponent, AutomaitcReportListComponent],
  imports: [
    CommonModule,
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

    AutomaitcReportRoutingModule
  ],
  providers: [ExcelService, { provide: LOCALE_ID, useValue: "es" }]
})
export class AutomaitcReportModule {}
