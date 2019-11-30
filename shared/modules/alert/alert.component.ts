import { Component, OnInit, Input } from "@angular/core";
import { AlertModel } from "../../models/helpers/Alert";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent implements OnInit {
  @Input() alertMessage: AlertModel;


  constructor() {

  }

  ngOnInit() {

  }

}
