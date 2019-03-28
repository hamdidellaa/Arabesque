import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitorsComponent } from './visitors/visitors.component';

import { DataApiService } from "./services/data-api.service"
import { HelperService } from "./services/helper.service" 
@NgModule({
  declarations: [
    AppComponent,
    VisitorsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataApiService,HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
