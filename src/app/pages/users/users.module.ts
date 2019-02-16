import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {  NbWindowModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { UsersRoutingModule, routedComponents } from './users-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { NgxLoadingModule,ngxLoadingAnimationTypes  } from 'ngx-loading';

@NgModule({
  imports: [
    ThemeModule,
    UsersRoutingModule,
    Ng2SmartTableModule,
    NgxLoadingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
  ],
 
})
export class UsersModule { }
