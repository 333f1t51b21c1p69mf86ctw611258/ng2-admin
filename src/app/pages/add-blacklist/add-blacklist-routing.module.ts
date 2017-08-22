import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//
import { AddBlacklistComponent } from "app/pages/add-blacklist";

const routes: Routes = [
  {
    path: '',
    component: AddBlacklistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBlacklistRoutingModule { }
