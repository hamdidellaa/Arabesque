import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../services/data-api.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {

  constructor(private apiService : DataApiService) { }

  ngOnInit() {
    this.apiService.getData().subscribe(data =>{
      console.log(data);
    })
  }

}
