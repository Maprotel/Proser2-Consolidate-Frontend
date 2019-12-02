import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { EnvService, UserSelectionService } from "shared/services";

import { UserSelectionModel } from "shared/models";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import {
  dateToDatePicker,
  objectTimeToTextTime,
  objectDateToTextDate,
  selectorOptionSubtitles,
  selectorLegendSubtitles
} from "shared/functions";

@Component({
  selector: "app-reports-report-header",
  templateUrl: "./report-header.component.html",
  styleUrls: ["./report-header.component.scss"]
})
export class ReportHeaderComponent implements OnInit {
  @Output() returnResult = new EventEmitter();

  @Input() userSelection;
  @Input() selectorVisibleFields;

  activeModal: NgbActiveModal;
  env;

  constructor(
    private envService: EnvService,
    private modalService: NgbModal,
    private userSelectionService: UserSelectionService
  ) {
    this.env = this.envService;
  }

  ngOnInit() {
    this.userSelection.options = selectorOptionSubtitles(this.userSelection)
    this.userSelection.legend = selectorLegendSubtitles(this.userSelection)
  }

  onUserSelectionText() {
    let data = new UserSelectionModel("standard");
    data.start_date = objectDateToTextDate(this.userSelection.start_date);
    data.end_date = objectDateToTextDate(this.userSelection.end_date);

    return data;
  }


  updateSelection(event, userSelectionBack) {
  }


}
