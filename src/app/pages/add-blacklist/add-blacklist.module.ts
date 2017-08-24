import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBlacklistRoutingModule } from './add-blacklist-routing.module';

//
import { AddBlacklistComponent } from "app/pages/add-blacklist/add-blacklist.component";
//
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

//
import { QueueBlacklistService } from "app/_services";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    AddBlacklistRoutingModule
  ],
  declarations: [
    AddBlacklistComponent
  ],
  providers: [
    QueueBlacklistService
  ]
})
export class AddBlacklistModule { }
