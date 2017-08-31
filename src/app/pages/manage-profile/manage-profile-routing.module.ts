import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//
import { ManageProfileComponent } from "app/pages/manage-profile/manage-profile.component";

const routes: Routes = [
  {
    path: '',
    component: ManageProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProfileRoutingModule { }
