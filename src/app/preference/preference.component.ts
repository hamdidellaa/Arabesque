import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { DataApiService } from '../services/data-api.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {
  msg : string = "";
  logs: any;
  dataList: any = [];
  filterData : any ;
  constructor(private apiService: DataApiService,private helper: HelperService) {

    this.apiService.getData().subscribe(data => {
      this.logs = data;
      this.dataList = this.logs.logs;
     let Data=this.helper.getDataFilter(this.dataList);
     this.filterData=this.helper.preferance(Data)
     console.log(this.filterData)
    });
  }

  ngOnInit() {
   
    
  }

}
