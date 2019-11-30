import { Component, OnInit, EventEmitter, Output } from "@angular/core";

import { AlertModel } from "shared/models/helpers/Alert";
import {
  AlertService,
  EnvService,
  UserSelectionService
} from "shared/services";
import { UserSelectionModel } from "shared/models";

@Component({
  selector: "app-reports-wait-time-report",
  templateUrl: "./wait-time-report.component.html",
  styleUrls: ["./wait-time-report.component.scss"]
})
export class WaitTimeReportComponent implements OnInit {
  userSelection: UserSelectionModel;
  selectorVisibleFields: UserSelectionModel;
  title;

  constructor(
    private alertService: AlertService,
    private envService: EnvService,
    private userSelectionService: UserSelectionService
  ) {
    this.selectorVisibleFields = new UserSelectionModel("visible");
    this.title = "Reporte de tiempos de espera";
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
}