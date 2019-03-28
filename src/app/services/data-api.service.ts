import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  private url : string = 'https://s3.eu-west-2.amazonaws.com/sample-sray-logs-coding-interview/sray-logs.json';

  constructor(private http:HttpClient) {
  }
  
  getData() {
  return this.http.get(this.url);
  }

}
