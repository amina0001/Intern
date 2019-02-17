import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {  NbWindowModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { UsersRoutingModule, routedComponents } from './users-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { NgxLoadingModule,ngxLoadingAnimationTypes  } from 'ngx-loading';
import { EqualValidator } from './equal-validator.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    UsersRoutingModule,
    Ng2SmartTableModule,
    NgxLoadingModule,
     FormsModule
  ],
  declarations: [
    ...routedComponents, EqualValidator 
  ],
  providers: [
    SmartTableService,
  ],
 
})
export class UsersModule { }
