import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ProfilesRoutingModule, profilesroutedComponents } from './profiles-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    ThemeModule,
     ProfilesRoutingModule,
         Ng2SmartTableModule,
NgxSpinnerModule
  ],
  declarations: [ 
    ...profilesroutedComponents,
  ],
  
})
export class ProfilesModule { }
