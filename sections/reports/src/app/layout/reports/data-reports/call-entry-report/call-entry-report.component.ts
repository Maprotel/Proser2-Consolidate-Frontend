import { Component, OnInit, EventEmitter, Output } from "@angular/core";

import { AlertModel } from "shared/models/helpers/Alert";

import {
  AlertService,
  EnvService,
  UserSelectionService
} from "shared/services";
import { UserSelectionModel } from "shared/models";


import {
  ExcelService, MainCallEntryService
} from 'sections/reports/src/shared/services';

@Component({
  selector: "app-reports-call-entry-report",
  templateUrl: "./call-entry-report.component.html",
  styleUrls: ["./call-entry-report.component.scss"]
})
export class CallEntryReportComponent implements OnInit {

  // Selector
  userSelection: UserSelectionModel;
  selectorVisibleFields: UserSelectionModel;
  menuOptions: UserSelectionModel;
  userSelectionTemp: UserSelectionModel;
  selectorVisibleAreas;

  // Show
  show_selector: boolean = false;
  show_callentry: boolean = false;
  show_stats: boolean = false;


  // Alert
  alertMessage: AlertModel = new AlertModel();

  // Data
  title;
  exportName;
  stats;
  rows;
  rows_original;

  constructor(
    private alertService: AlertService,
    private envService: EnvService,
    private userSelectionService: UserSelectionService,
    private mainCallEntryService: MainCallEntryService,
    private excelService: ExcelService,
  ) {

  }

  ngOnInit() {
    this.userSelectionHistoric();
  }
  setReportTitles() {
    // this.userSelection = new UserSelectionModel("standard");
    this.userSelection.title = this.title;
    //
    // //
    this.userSelectionService.writeUserSelectionHistoric(this.userSelection);

    this.selectorVisibleFields.assignation = false;
    this.selectorVisibleFields.auxiliar = false;
  }

  userSelectionHistoric() {

    this.userSelection = new UserSelectionModel('standard')
    this.selectorVisibleFields = new UserSelectionModel("visible");
    this.selectorVisibleFields.start_time = false
    this.selectorVisibleFields.end_time = false
    this.menuOptions = new UserSelectionModel("menuOptions");
    this.selectorVisibleAreas = {
      date: true,
      interval: false,
      options: false,
      buttons: true,
    }
    this.title = "Registro de entrada de llamadas";
    this.exportName = "reporte-call-entry";

    this.userSelection = this.userSelectionService.readUserSelectionHistoric();
    this.selectorVisibleFields.groupBy = false;
    this.selectorVisibleFields.interval = false;
    this.selectorVisibleFields.last_minutes = false;

    this.selectorVisibleFields.auxiliar = false;
    this.selectorVisibleFields.assignation = false;

    this.userSelection.title = this.title;
    this.userSelection.mode = { id: 1, name: "Histórico", value: "historic" };
    this.userSelectionService.writeUserSelectionHistoric(this.userSelection);
    this.userSelection = this.userSelectionService.readUserSelectionHistoric();
  }

  onOpenSelector(event) {
    console.log('event back', event);
    this.userSelectionTemp = this.userSelection
    this.show_selector = true
    this.userSelection = this.userSelectionService.readUserSelectionHistoric();
  }

  // Selector
  onCloseSelector(event) {
    console.log('event back', event);
    this.show_selector = false
    this.userSelectionService.writeUserSelectionHistoric(this.userSelection);
  }

  onCancelSelector() {
    console.log('event back', event);
    this.show_selector = false;
    this.userSelection = this.userSelectionTemp;
  }

  // Data
  getReportList(userSelection) {
    if (userSelection) {
      this.rows = [];

      this.mainCallEntryService.getReportList(userSelection).subscribe(
        (res) => {
          this.show_callentry = false;

          if (Array.isArray(res)) {
            this.rows = res;
            this.show_callentry = true;
            console.log('this.rows', this.rows);

          } else {
            console.error("Error", res);
          }
          this.alertMessage = new AlertModel();
        },
        error => {
          console.error("Error", error);
          this.show_callentry = false;
          this.alertService.error(error.status);
          this.alertMessage.alertTitle = "Error del servidor";
          this.alertMessage.alertText = error.statusText;
          this.alertMessage.alertShow = true;
          this.alertMessage.alertClass =
            "alert alert-danger alert-dismissible fade show";
        }
      );
    }
  }


  getResumeStats(userSelection) {
    if (userSelection) {
      this.stats = {};

      this.mainCallEntryService.getResumeStats(userSelection).subscribe(
        (res) => {
          this.show_stats = false;

          this.stats = res;
          this.show_stats = true;
          console.log('this.stats', this.stats);

          this.alertMessage = new AlertModel();
        },
        error => {
          console.error("Error", error);
          this.show_stats = false;
          this.alertService.error(error.status);
          this.alertMessage.alertTitle = "Error del servidor";
          this.alertMessage.alertText = error.statusText;
          this.alertMessage.alertShow = true;
          this.alertMessage.alertClass =
            "alert alert-danger alert-dismissible fade show";
        }
      );
    }
  }


  // Export
  exportToExcel(data) {

    if (data) {

      const filterData = data.map(x => {
        return {

          agente_id: x.agente_id,
          agente_nombre: x.agente_nombre,
          año_dia_de_entrada_en_cola: x.año_dia_de_entrada_en_cola,
          año_mes_de_entrada_en_cola: x.año_mes_de_entrada_en_cola,
          año_sem_de_entrada_en_cola: x.año_sem_de_entrada_en_cola,
          call_center: x.call_center,
          cola_id: x.cola_id,
          cola_nombre: x.cola_nombre,
          cola_numero: x.cola_numero,
          colgada_por: x.colgada_por,
          contacto_telefono: x.contacto_telefono,
          dia_sem_de_entrada_en_cola: x.dia_sem_de_entrada_en_cola,
          duracion_llamada_seg: x.duracion_llamada_seg,
          estatus: x.estatus,
          extension_llamada_transferida: x.extension_llamada_transferida,
          fecha_de_entrada_en_cola: x.fecha_de_entrada_en_cola,
          fecha_fin_llamada: x.fecha_fin_llamada,
          fecha_inicio_llamada: x.fecha_inicio_llamada,
          final_status: x.final_status,
          hh_de_entrada_en_cola: x.hh_de_entrada_en_cola,
          hora_de_entrada_en_cola: x.hora_de_entrada_en_cola,
          hora_fin_llamada: x.hora_fin_llamada,
          hora_inicio_llamada: x.hora_inicio_llamada,
          id: x.id,
          mm_de_entrada_en_cola: x.mm_de_entrada_en_cola,
          numero_llamada_id: x.numero_llamada_id,
          ss_de_entrada_en_cola: x.ss_de_entrada_en_cola,
          supervisor_id: x.supervisor_id,
          supervisor_nombre: x.supervisor_nombre,
          tiempo_espera_seg: x.tiempo_espera_seg,
          tipo_llamada: x.tipo_llamada,


        };
      });
      this.excelService.exportAsCsvFile(filterData, this.exportName);
    }
    else {
      console.log('No data available');

    }
  }

}
