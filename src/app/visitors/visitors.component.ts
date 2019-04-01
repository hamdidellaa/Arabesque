import { Component, OnInit } from "@angular/core";
import { HelperService } from "../services/helper.service";
import * as moment from "moment";
import { DataApiService } from "../services/data-api.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { toBase64String } from "@angular/compiler/src/output/source_map";
@Component({
  selector: "app-visitors",
  templateUrl: "./visitors.component.html",
  styleUrls: ["./visitors.component.css"]
})
export class VisitorsComponent implements OnInit {
  startDate = moment("2018-10-01").format("Y-MM-DD");
  endDate = moment("2018-10-10").format("Y-MM-DD");
  data: any;
  msg: string = "";
  logs: any;
  dataList: any = [];
  visites: number = 0;
  constructor(
    private apiService: DataApiService,
    private helper: HelperService
  ) {
    this.apiService.getData().subscribe(data => {
      this.logs = data;
      this.dataList = this.logs.logs;
      this.dateChange();
    });
  }

  ngOnInit() {}
  startDateChange(date: MatDatepickerInputEvent<Date>) {
    this.startDate = moment(date.value).format("Y-MM-DD");
    this.dateChange();
  }
  endDateChange(date: MatDatepickerInputEvent<Date>) {
    this.endDate = moment(date.value).format("Y-MM-DD");
    this.dateChange();
  }
  dateChange() {
    this.visites = 0 ;
    if (moment(this.startDate).isAfter(this.endDate)) {
      this.msg = "start date is after end date";
    } else {
      this.msg = "";
      this.data = this.helper.dateChange(
        this.dataList,
        this.startDate,
        this.endDate
      );
      this.data.forEach(element => {
        this.visites += element.nbVisite;
      });
    }
  }
}
