

import { Component, OnInit, Input } from "@angular/core";

import { AlertModel } from "shared/models/helpers/Alert";
import { AlertService } from "shared/services";

import { getUpdateFilter } from "shared/functions";

import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

import { UserSelectionService } from "shared/services/crud/system/user-selection.service";

import { UserSelectionModel } from "shared/models";

import {
  objectDateToTextDate,
  textDateToObjectDate
} from "shared/functions";

import { ExcelService } from 'sections/reports/src/shared/services';

import { OperationConsolidateOperationService } from "sections/reports/src/shared/services/reports/operation/reports-operation-consolidate.service";
import { OperationConsolidateOperationModel } from "sections/reports/src/shared/models/reports/operation/OperationConsolidateOperation.model";


@Component({
  selector: 'app-reports-consolidate-report-list',
  templateUrl: './consolidate-report-list.component.html',
  styleUrls: ['./consolidate-report-list.component.scss']
})
export class ConsolidateReportListComponent implements OnInit {

  @Input() userSelection: UserSelectionModel;
  @Input() selectorVisibleFields: UserSelectionModel;

  numberOfRowsInTable;
  selectedAsArray;
  filterFieldList;

  rows;
  rows_original;
  selection;
  findInList;

  selected = [];
  show_columns = false;
  alertMessage = new AlertModel();

  local_store;
  agent;

  show = false;
  timerConnected;

  activeModal: NgbActiveModal;
  initialSelectedFilterField;

  model: OperationConsolidateOperationModel;
  exportName;

  constructor(
    private operationConsolidateOperationService: OperationConsolidateOperationService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private userSelectionService: UserSelectionService,
    private excelService: ExcelService
  ) {
    this.model = new OperationConsolidateOperationModel();
    this.local_store = "assignation";
    this.selectorVisibleFields = new UserSelectionModel("visible");

  }

  ngOnInit() {
    this.hideSelectorFields();
    this.userSelection = this.userSelectionService.readUserSelectionHistoric(
      this.local_store
    );
    this.getReportList(this.userSelection);
    this.filterFieldList = this.model.fieldList();
    this.numberOfRowsInTable = { id: 10, value: 10 };
    this.exportName = "reporte-consolidado-operacion";

    this.initialSelectedFilterField = {
      field_name: "callentry_uniqueid",
      name: "identificador_llamada",
      text: "Identificador"
    };
  }

  ngOnDestroy() {
    this.userSelectionService.writeUserSelectionHistoric(
      this.userSelection,

    );
  }

  getReportList(userSelection) {
    if (userSelection) {
      this.rows = [new OperationConsolidateOperationModel()];

      this.operationConsolidateOperationService.getReportList(userSelection).subscribe(
        (res: [OperationConsolidateOperationModel]) => {
          this.show = false;

          this.timerConnected = 0;

          if (Array.isArray(res)) {
            this.rows = res;
            this.rows_original = res;


            this.show = true;
          } else {
            console.error("Error", res);
          }
          this.alertMessage = new AlertModel();
        },
        error => {
          console.error("Error", error);
          this.show = false;
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

  hideSelectorFields() {

    this.selectorVisibleFields.assignation = false;
    this.selectorVisibleFields.auxiliar = false;
    this.selectorVisibleFields.start_time = false;
    this.selectorVisibleFields.end_time = false;
    this.selectorVisibleFields.client = false;
    this.selectorVisibleFields.queue = false;
    this.selectorVisibleFields.service = false;
    this.selectorVisibleFields.campaign = false;
    this.selectorVisibleFields.supervisor = false;
    this.selectorVisibleFields.role = false;
    this.selectorVisibleFields.schedule = false;
    this.selectorVisibleFields.last_minutes = false;
    this.selectorVisibleFields.interval = false;
    this.selectorVisibleFields.groupBy = false;
    this.selectorVisibleFields.groupBy = false;
    this.selectorVisibleFields.status = false;
  }

  updateSelection($event) {
    this.userSelection = this.userSelectionService.readUserSelectionHistoric(
      this.local_store
    );
  }

  closeSelector($event) {
    this.userSelection = this.userSelectionService.readUserSelectionHistoric(
      this.local_store
    );
    this.ngOnInit();
  }
  onActivate(event, ngModelDir?) {
    if (event.type === "dblclick") {
    }
  }

  onSelect(event) {
    this.selected = event.selected;
  }

  onOpenDetailWindow(content) {
    this.selectedAsArray = this.onObjectToArray(this.selected[0]);
    this.openModal(content);
  }

  onObjectToArray(data) {
    let obj = data[0];

    let output;
    if (obj !== undefined) {
      output = Object.entries(obj).map(([key, value]) => ({
        key,
        value
      }));
    }
    return output;
  }

  onChange() { }

  openModal(content) {
    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }

  // Activated by button
  onRecalculate(event) {
    this.userSelection = this.userSelectionService.readUserSelectionHistoric(
      this.local_store
    );
    this.getReportList(this.userSelection);
  }

  onUpdateReport(event) {
    this.getReportList(this.userSelection);
  }

  onGetAll() {
    this.findInList = "";
    this.getReportList(this.userSelection);
  }

  // Update on return of sehector in header
  onReturnHeaderResult(event) {
    this.ngOnInit();
  }

  onReturnNumberOfRowsInTable(event) {
    console.error("event", event);
    this.numberOfRowsInTable = event;
  }

  onReturnRowsForTable(event) {
    this.rows = event;
  }

  onCreateModel(model?) {
    model = new OperationConsolidateOperationModel().fieldList();

    console.error("model", model);

    let obj = {};

    model.map(x => {
      obj[`${x.name}`] = "x." + x.field_name;
    });

    let newModel = JSON.stringify(obj);
    let newModel2 = JSON.stringify(
      newModel
        .replace(/\"/g, "")
        .replace(/:/g, ": ")
        .replace(/,/g, ",\n ")
    );
    let model3 = eval(newModel2);

    console.error("model", model3);
  }

  exportToExcel(data) {
    const filterData = data.map(x => {
      return {
        id_agente: x.agent_id,
        nombre_agente: x.agent_name,
        fecha_inicio: x.min_date,
        fecha_fin: x.max_date,

        duracion_seg_login: x.login_duration_sec,
        duracion_seg_llamadas_atendidas: x.inbound_attended_duration_sec,
        duracion_seg_llamadas_realizadas: x.outbound_made_sec,
        duracion_seg_llamadas_internas: x.outbound_internal_sec,
        duracion_seg_auxiliares: x.auxiliar_duration_sec,
        duracion_seg_asignaciones: x.assignation_duration_sec,
        duracion_seg_disponible: x.available_duration_sec,

        duracion_hms_login: x.login_duration_time,
        duracion_hms_llamadas_atendidas: x.inbound_attended_duration_time,
        duracion_hms_llamadas_realizadas: x.outbound_made_time,
        duracion_hms_llamadas_internas: x.outbound_internal_time,
        duracion_hms_auxiliar: x.auxiliar_duration_time,
        duracion_hms_asignacion: x.assignation_duration_time,
        duracion_hms_disponible: x.available_duration_time,

        llamadas_atendidas: x.inbound_calls_attended,
        llamadas_realizadas: x.outbound_calls_made,
        llamadas_internas: x.outbound_internal_made,
        porcentaje_duracion_atendidas: x.inbound_percent,
        porcentaje_duracion_realizadas: x.outbound_percent,
        porcentaje_duracion_internas: x.internal_percent,
        porcentaje_duracion_auxiliar: x.auxiliar_percent,
        porcentaje_duracion_asignacion: x.assignation_percent,
        porcentaje_duracion_disponible: x.available_percent,

      };
    });

    this.excelService.exportAsExcelFile(filterData, this.exportName);
  }
}
