import { Component, OnInit } from "@angular/core";
import { HelperService } from "../services/helper.service";
import * as moment from "moment";
@Component({
  selector: "app-visitors",
  templateUrl: "./visitors.component.html",
  styleUrls: ["./visitors.component.css"]
})
export class VisitorsComponent implements OnInit {
  startDate = moment("2018-10-01").format("Y-MM-DD");
  endDate = moment("2018-10-02").format("Y-MM-DD");
  data: any;
  msg : string = "";
  constructor(private helper: HelperService) {}

  ngOnInit() {
    this.dateChange();
  }

  dateChange() {
    if (moment(this.startDate).isAfter(this.endDate)) {
      this.msg = "start date is after end date"; 
    } else {
      this.msg = ""; 
      this.data = this.helper.dateChange(this.startDate, this.endDate);
    }
  }
}
