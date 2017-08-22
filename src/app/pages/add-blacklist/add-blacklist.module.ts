import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBlacklistRoutingModule } from './add-blacklist-routing.module';

//
import { AddBlacklistComponent } from "app/pages/add-blacklist/add-blacklist.component";

@NgModule({
  imports: [
    CommonModule,
    AddBlacklistRoutingModule
  ],
  declarations: [
    AddBlacklistComponent
  ]
})
export class AddBlacklistModule { }
