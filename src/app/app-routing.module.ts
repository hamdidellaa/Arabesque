import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitorsComponent } from './visitors/visitors.component';
import { PreferenceComponent } from './preference/preference.component';

const routes: Routes = [
  {path : "" , component : VisitorsComponent},
  {path : "preferance" , component : PreferenceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
