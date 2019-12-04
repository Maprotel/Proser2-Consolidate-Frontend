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

import { CallEntryReportComponent } from "./call-entry-report.component";
import { CallEntryReportRoutingModule } from "./call-entry-report-routing.module";

import { ReportHeaderModule } from "sections/reports/src/shared/modules/report-header/report-header.module";
import { ReportFinderModule } from "sections/reports/src/shared/modules/report-finder/report-finder.module";

import { ExcelService } from 'sections/reports/src/shared/services';
import { CallEntryStatsComponent } from './call-entry-stats/call-entry-stats.component';


@NgModule({
  declarations: [CallEntryReportComponent, CallEntryStatsComponent],
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
 

    CallEntryReportRoutingModule
  ],
  providers: [ExcelService, { provide: LOCALE_ID, useValue: "es" }]
})
export class CallEntryReportModule {}
