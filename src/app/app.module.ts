import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitorsComponent } from './visitors/visitors.component';

import { DataApiService } from "./services/data-api.service"
import { HelperService } from "./services/helper.service";
import { BarChartComponent } from './visitors/bar-chart/bar-chart.component';
import { PieChartComponent } from './preference/pie-chart/pie-chart.component';
import { PreferenceComponent } from './preference/preference.component' 
@NgModule({
  declarations: [
    AppComponent,
    VisitorsComponent,
    BarChartComponent,
    PieChartComponent,
    PreferenceComponent
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
