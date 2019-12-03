import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  ExcelService, MainCallEntryService
} from 'sections/reports/src/shared/services';

import * as _ from 'lodash';

@Component({
  selector: "app-reports-call-entry-report",
  templateUrl: "./call-entry-report.component.html",
  styleUrls: ["./call-entry-report.component.scss"]
})
export class CallEntryReportComponent implements OnInit {

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

  // Alert
  alertMessage: AlertModel = new AlertModel();

  // Data
  title;
  exportName;
  ping;
  stats;
  rows;
  rows_count;

  // msg
  msg_connection;
  msg_information;
  msg_data;
  msg_export;
  msg_exported;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private envService: EnvService,
    private userSelectionService: UserSelectionService,
    private mainCallEntryService: MainCallEntryService,
    private excelService: ExcelService,
  ) {

  }

  ngOnInit() {
    this.onResetValues();
  }

  onResetValues() {

    this.userSelection = new UserSelectionModel('standard')
    this.selectorVisibleFields = new UserSelectionModel("visible");
    this.selectorVisibleFields.start_time = false;
    this.selectorVisibleFields.end_time = false;
    this.menuOptions = new UserSelectionModel("menuOptions");
    this.selectorVisibleAreas = {
      date: true,
      interval: false,
      options: false,
      buttons: true,
    }
    this.selectorStatus = false;
    this.title = "Exportar llamadas entrantes";
    this.exportName = "registros-call-entry";

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

    this.ping = null;
    this.stats = null;
    this.rows = null;
    this.rows_count = null;

    this.userSelection.title = this.title;
    this.userSelection.mode = { id: 1, name: "Histórico", value: "historic" };
    this.userSelectionService.writeUserSelectionHistoric(this.userSelection);
    this.userSelection = this.userSelectionService.readUserSelectionHistoric();
  }

  onOpenSelector(event) {
    console.log('open');
    openDetailModal('selector');

    if (event) {
      this.userSelectionTemp = this.userSelection
      this.show_selector = true
      this.userSelection = this.userSelectionService.readUserSelectionHistoric();
    } else {
      this.show_selector = false
    }
  }

  // Selector
  onAcceptSelector(event) {
    this.show_selector = false
    this.selectorStatus = false
    console.log('onAcceptSelector', this.selectorStatus);
    this.userSelectionService.writeUserSelectionHistoric(this.userSelection);
    this.onResetValues()
    this.onCloseModal()
  }

  onCancelSelector() {
    this.show_selector = false;
    this.selectorStatus = false;
    this.userSelection = this.userSelectionTemp;
    this.onCloseModal()
  }

  // Data
  onPing() {
    this.ping = null
    this.msg_connection = 'Procesando...'
    this.mainCallEntryService.ping().subscribe(
      (res) => {
        this.ping = res;
        this.alertMessage = new AlertModel();
        this.msg_connection = null;
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



  getReportList(userSelection) {
    this.rows = [];
    this.show_callentry = false;
    this.msg_data = 'Procesando...'

    if (userSelection) {

      this.mainCallEntryService.getReportList(userSelection).subscribe(
        (res) => {


          let temp = res;
          this.show_callentry = true;

          let array = []

          this.rows = _.concat(
            array,
            res.CallEntryEmergencia,
            res.CallEntryAps,
            res.CallEntryAmd
          );


          this.rows_count = this.rows.reduce((total, amount, index, array) => {
            total += 1
            return total
          }, 0);

          this.alertMessage = new AlertModel();
          this.msg_data = null
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
    this.stats = null
    this.show_stats = false;
    this.msg_information = 'Procesando...'
    if (userSelection) {
      this.stats = {};

      this.mainCallEntryService.getResumeStats(userSelection).subscribe(
        (res) => {
          this.show_stats = false;

          this.stats = res;
          this.show_stats = true;


          this.alertMessage = new AlertModel();
          this.msg_information = null
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

    this.msg_export = 'Procesando...'

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

      let temp = this.excelService.exportAsCsvFile(filterData, this.exportName);
      this.msg_export = null
      this.msg_exported = 'Data lista para guardar';
    }
    else {
      this.msg_exported = 'No se pudo exportar la data'
      console.log('No data available');

    }
  }

  // Modal

  openDetailModal(content) {
    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }

  onCloseModal() {
    this.activeModal.close();
  }

}
