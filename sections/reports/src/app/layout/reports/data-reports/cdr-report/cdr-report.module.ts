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

import { CdrReportComponent } from "./cdr-report.component";
import { CdrReportRoutingModule } from "./cdr-report-routing.module";

import { CdrReportListComponent } from "./cdr-report-list/cdr-report-list.component";

import { ReportHeaderModule } from "sections/reports/src/shared/modules/report-header/report-header.module";
import { ReportFinderModule } from "sections/reports/src/shared/modules/report-finder/report-finder.module";


import { ExcelService } from 'sections/reports/src/shared/services';


@NgModule({
  declarations: [CdrReportComponent, CdrReportListComponent],
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


    CdrReportRoutingModule
  ],
  providers: [ExcelService, { provide: LOCALE_ID, useValue: "es" }]
})
export class CdrReportModule {}
