
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {  NbWindowModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { GroupsRoutingModule, routedComponents } from './groups-routing.module';
import { NgxLoadingModule,ngxLoadingAnimationTypes  } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PagerService } from './_services/index';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    ThemeModule,
    GroupsRoutingModule,
    Ng2SmartTableModule,
     FormsModule,
     DragDropModule,
      NgxSpinnerModule
  ],
  declarations: [
    ...routedComponents 
  ],
  providers: [
PagerService
  ],
 
})
export class GroupsModule { }
