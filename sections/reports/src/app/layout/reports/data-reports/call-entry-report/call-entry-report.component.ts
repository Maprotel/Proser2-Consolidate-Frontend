import { Component, OnInit, EventEmitter, Output } from "@angular/core";

import { AlertModel } from "shared/models/helpers/Alert";

import {
  AlertService,
  EnvService,
  UserSelectionService
} from "shared/services";
import { UserSelectionModel } from "shared/models";

@Component({
  selector: "app-reports-call-entry-report",
  templateUrl: "./call-entry-report.component.html",
  styleUrls: ["./call-entry-report.component.scss"]
})
export class CallEntryReportComponent implements OnInit {


  userSelection: UserSelectionModel;
  selectorVisibleFields: UserSelectionModel;
  menuOptions: UserSelectionModel;
  userSelectionTemp: UserSelectionModel;
  selectorVisibleAreas;

  title;

  alertMessage: AlertModel = new AlertModel();

  show_selector: boolean = false;

  // Data
  stats;

  constructor(
    private alertService: AlertService,
    private envService: EnvService,
    private userSelectionService: UserSelectionService
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
      buttons: false,
    }
    this.title = "Registro de entrada de llamadas";

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
}
