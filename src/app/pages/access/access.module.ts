import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {  NbWindowModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { AccessRoutingModule, routedComponents } from './access-routing.module';
import { NgxLoadingModule,ngxLoadingAnimationTypes  } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from  'ngx-ui-loader';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    ThemeModule,
    AccessRoutingModule,
        Ng2SmartTableModule,
NgxUiLoaderModule,
    NgxSpinnerModule,

    FormsModule
  ],
  declarations: [
    ...routedComponents 
  ],
  providers: [
  ],
 
})
export class AccessModule { }
