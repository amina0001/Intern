import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {  NbWindowModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { UsersRoutingModule, routedComponents } from './users-routing.module';
import { NgxLoadingModule,ngxLoadingAnimationTypes  } from 'ngx-loading';
import { EqualValidator } from './equal-validator.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    UsersRoutingModule,
    FormsModule
  ],
  declarations: [
    ...routedComponents, EqualValidator 
  ],
  providers: [
  ],
 
})
export class UsersModule { }
