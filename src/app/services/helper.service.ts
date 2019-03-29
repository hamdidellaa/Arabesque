import { Injectable } from "@angular/core";
import * as moment from "moment";
import * as _ from "lodash";
import { of as observableOf, Observable } from "rxjs";
import { DataApiService } from "./data-api.service";


@Injectable({
  providedIn: "root"
})
export class HelperService {
  dataList: any = [];
  logs: any;
  totalLog : any ;
  startDate: any;
  endDate: any;
  daysList : any = [];
  constructor(private apiService: DataApiService) {
    this.apiService.getData().subscribe(data => {
      this.logs = data;
      this.dataList = this.logs.logs;
    });
  }

  dateChange(startDate, endDate) {
      let data: any = [];
      const dateS = moment(startDate);
      const dateE = moment(endDate);
      let testData = this.dataList.filter(item => moment(item.date).isBetween(dateS, dateE) && item.action == "LOAD"
      );
      let daysBetween = dateE.diff(dateS, "days")
      for (let index = 0; index <= daysBetween; index++) {
        let testDate =  moment(dateS)
        .add(index, "days")
        .format("Y-MM-D");
        let testList = testData.filter(item => testDate == moment(item.date).format("Y-MM-D"))
        let finalList = _.uniqBy(testList, 'user_id');
        data.push({ Date: testDate, nbVisite: finalList.length });
      }

      return data;
    
  }
}
