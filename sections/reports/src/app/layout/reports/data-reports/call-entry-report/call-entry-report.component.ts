import { isNullOrUndefined } from "util";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";

import { AlertModel } from "shared/models/helpers/Alert";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import {
  AlertService,
  EnvService,
  UserSelectionService
} from "shared/services";
import { UserSelectionModel } from "shared/models";

import {
  ExcelService,
  MainCallEntryService
} from "sections/reports/src/shared/services";

import * as _ from "lodash";

@Component({
  selector: "app-reports-call-entry-report",
  templateUrl: "./call-entry-report.component.html",
  styleUrls: ["./call-entry-report.component.scss"]
})
export class CallEntryReportComponent implements OnInit {
  // Alert
  alertMessage: AlertModel = new AlertModel();

  // Modal
  activeModal: NgbActiveModal;

  // Selector
  userSelection: UserSelectionModel;
  selectorVisibleFields: UserSelectionModel;
  menuOptions: UserSelectionModel;
  userSelectionTemp: UserSelectionModel;
  selectorVisibleAreas;
  selectorStatus;

  // Show
  show_selector: boolean = false;
  show_callentry: boolean = false;
  show_stats: boolean = false;
  show_start_process: boolean = false;

  // Data
  title;
  exportDataName;
  exportAuditName;
  ping;
  stats;
  stats_concat;
  rows;
  rows_count;
  filename;

  // msg
  msg_connection;
  msg_information;
  msg_data;
  msg_export;
  msg_exported;
  msg_audit;
  msg_audited;


  // Error

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private envService: EnvService,
    private userSelectionService: UserSelectionService,
    private mainCallEntryService: MainCallEntryService,
    private excelService: ExcelService
  ) {}

  ngOnInit() {
    this.onResetValues();
  }

  onResetValues() {
    this.userSelection = new UserSelectionModel("standard");
    this.selectorVisibleFields = new UserSelectionModel("visible");
    this.selectorVisibleFields.start_time = false;
    this.selectorVisibleFields.end_time = false;
    this.menuOptions = new UserSelectionModel("menuOptions");
    this.selectorVisibleAreas = {
      date: true,
      interval: false,
      options: false,
      buttons: false
    };
    this.selectorStatus = false;
    this.title = "Exportar llamadas entrantes";
    this.exportDataName = "registros-call-entry";
    this.exportAuditName = "auditoria-call-entry";

    this.userSelection = this.userSelectionService.readUserSelectionHistoric();
    this.selectorVisibleFields.groupBy = false;
    this.selectorVisibleFields.interval = false;
    this.selectorVisibleFields.last_minutes = false;

    this.selectorVisibleFields.auxiliar = false;
    this.selectorVisibleFields.assignation = false;

    this.msg_connection = null;
    this.msg_information = null;
    this.msg_data = null;
    this.msg_export = null;
    this.msg_exported = null;
    this.msg_audit = null;
    this.msg_audited = null;

    this.show_callentry = null;
    this.show_stats = null;

    this.ping = null;
    this.stats = null;
    // this.show_stats = false;
    this.rows = null;
    this.rows_count = null;

    this.userSelection.title = this.title;
    this.userSelection.mode = { id: 1, name: "Histórico", value: "historic" };
    this.userSelectionService.writeUserSelectionHistoric(this.userSelection);
    this.userSelection = this.userSelectionService.readUserSelectionHistoric();
    
  }

  onBegin() {
    this.onResetValues();
    this.mainCallEntryService.cleanOldFiles(this.userSelection).subscribe(
      data => {
        this.show_start_process = true;
      }
    );
  }

  // Selector
  onOpenSelector(event) {
    this.onOpenModal(event);
  }

  onAcceptSelector(event) {
    this.show_selector = false;
    this.selectorStatus = false;
    this.userSelectionService.writeUserSelectionHistoric(this.userSelection);
    this.onResetValues();
    this.onCloseModal();
  }

  onCancelSelector(event) {
    this.show_selector = false;
    this.selectorStatus = false;
    this.userSelection = this.userSelectionTemp;
    this.onCloseModal();
  }

  // Data
  onPing() {
    this.ping = null;
    this.msg_connection = "Procesando...";
    this.mainCallEntryService.ping().subscribe(
      res => {
        this.ping = res;
        this.alertMessage = new AlertModel();
        this.msg_connection = null;
      },
      error => {
        console.error("Error", error);
        this.msg_connection = "Error: " + JSON.stringify(error);
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

  getReportList(userSelection) {
    this.rows = [];
    this.show_callentry = false;
    this.msg_data = "Procesando...";

    if (userSelection) {
      this.mainCallEntryService.getReportList(userSelection).subscribe(
        res => {
          let temp = res;
          this.filename = res[0];
          this.show_callentry = true;

          let array = [];

          this.rows = _.concat(
            array,
            res.CallEntryEmergencia,
            res.CallEntryAps,
            res.CallEntryAmd
          );

          this.rows_count = this.rows.reduce((total, amount, index, array) => {
            total += 1;
            return total;
          }, 0);

          this.alertMessage = new AlertModel();
          this.msg_data = null;
        },
        error => {
          console.error("Error", error);
          this.msg_data = "Error: " + JSON.stringify(error);
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
    // this.onResetValues()

    this.msg_information = "Procesando...";
    if (userSelection) {
      this.stats = {};

      this.mainCallEntryService.getResumeStats(userSelection).subscribe(
        res => {
          this.show_stats = false;

          this.stats = res;
          this.show_stats = true;

          let array = [];

          this.stats_concat = _.concat(
            array,
            res.callCenterAmd,
            res.callCenterAps,
            res.callCenterEmergencia,
            res.reportsAmd,
            res.reportsAps,
            res.reportsEmergencia
          );
          this.alertMessage = new AlertModel();
          this.msg_information = null;
        },
        error => {
          console.error("Error", error);
          this.msg_information = "Error: " + JSON.stringify(error);
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
  exportDataToCsv(data) {
    this.msg_export = "Procesando...";

    if (data) {
      const filterData = data.map(x => {
        return {
          call_center: x.call_center,
          id: x.id,

          estatus: x.estatus,

          final_status: x.final_status,
          tipo_llamada: x.tipo_llamada,

          fecha_de_entrada_en_cola: x.fecha_de_entrada_en_cola,
          hora_de_entrada_en_cola: x.hora_de_entrada_en_cola,

          fecha_inicio_llamada: x.fecha_inicio_llamada,
          hora_inicio_llamada: x.hora_inicio_llamada,
          fecha_fin_llamada: x.fecha_fin_llamada,
          hora_fin_llamada: x.hora_fin_llamada,

          cola_id: x.cola_id,
          cola_nombre: x.cola_nombre,
          cola_numero: x.cola_numero,
          agente_id: x.agente_id,
          agente_nombre: x.agente_nombre,
          supervisor_id: x.supervisor_id,
          supervisor_nombre: x.supervisor_nombre,
          contacto_telefono: x.contacto_telefono,

          duracion_llamada_seg: x.duracion_llamada_seg,
          tiempo_espera_seg: x.tiempo_espera_seg,
          numero_llamada_id: x.numero_llamada_id,
          colgada_por: x.colgada_por,

          dia_sem_de_entrada_en_cola: x.dia_sem_de_entrada_en_cola,
          año_sem_de_entrada_en_cola: x.año_sem_de_entrada_en_cola,
          año_mes_de_entrada_en_cola: x.año_mes_de_entrada_en_cola,
          año_dia_de_entrada_en_cola: x.año_dia_de_entrada_en_cola,
          hh_de_entrada_en_cola: x.hh_de_entrada_en_cola,
          mm_de_entrada_en_cola: x.mm_de_entrada_en_cola,
          ss_de_entrada_en_cola: x.ss_de_entrada_en_cola

          // extension_llamada_transferida: x.extension_llamada_transferida,
        };
      });

      let temp = this.excelService.exportAsCsvFile(
        filterData,
        this.exportDataName
      );
      this.msg_export = null;
      this.msg_exported = "Data lista para guardar";
    } else {
      this.msg_exported = "No se pudo exportar la data";
    }
  }

  exportAuditToCsv(data) {
    this.msg_audit = "Procesando...";

    if (data) {
      const filterData = data.map(x => {
        return {
          origen: x.origin,
          callentry_total_registros: x.callentry_count,
          callentry_min_numero_id: x.callentry_min,
          callentry_max_numero_id: x.callentry_max,
          callentry_validacion:
            x.callentry_max && x.callentry_min
              ? x.callentry_max - x.callentry_min + 1
              : null,
          callentry_min_fecha_entrada_cola: x.callentry_min_calldate,
          callentry_max_fecha_entrada_cola: x.callentry_max_calldate
        };
      });

      let temp = this.excelService.exportAsCsvFile(
        filterData,
        this.exportAuditName
      );
      this.msg_audit = null;
      this.msg_audited = "Data lista para guardar";
    } else {
      this.msg_exported = "No se pudo exportar la data";
    }
  }

  // Modal

  onOpenModal(content) {
    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }

  onCloseModal() {
    this.userSelection = this.userSelectionService.readUserSelectionHistoric();
    this.activeModal.close();
  }

  downloadFile() {
    // const recordSelection = JSON.parse(localStorage.getItem("selected_row"));
    // const url = recordSelection.record;
    const route = this.filename;
    // const fileExtension = route.substring(route.lastIndexOf(".") + 1);

    // const src = recordSelection.call_source;
    // const dst = recordSelection.call_destiny;

    let fileName = this.filename;

    // if (ext) {
    //   fileName = fileName + "." + ext;
    // }

    this.mainCallEntryService.downloadFile(route, fileName).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (fileName) downloadLink.setAttribute("download", fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      },
      error => {
        console.error("Error", error);
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
