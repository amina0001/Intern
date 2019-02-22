
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {  NbWindowModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { GroupsRoutingModule, routedComponents } from './groups-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { NgxLoadingModule,ngxLoadingAnimationTypes  } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    ThemeModule,
    GroupsRoutingModule,
    Ng2SmartTableModule,
    NgxLoadingModule,
     FormsModule,
     DragDropModule
  ],
  declarations: [
    ...routedComponents 
  ],
  providers: [
    SmartTableService,
  ],
 
})
export class GroupsModule { }
