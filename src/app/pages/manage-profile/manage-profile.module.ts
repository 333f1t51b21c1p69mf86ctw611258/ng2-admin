import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProfileRoutingModule } from './manage-profile-routing.module';

//
import { ManageProfileComponent } from 'app/pages/manage-profile/manage-profile.component';

//
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { BasicTablesService } from 'app/pages/tables/components/basicTables/basicTables.service';
import { ProfileService } from 'app/_services/profile.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    ManageProfileRoutingModule,
  ],
  declarations: [
    ManageProfileComponent,
  ],
  providers: [
    BasicTablesService,
    ProfileService,
  ],
})
export class ManageProfileModule { }
