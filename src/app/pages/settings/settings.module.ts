import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { SettingsRoutingModule, settingsroutedComponents } from './settings-routing.module';

@NgModule({
  imports: [
    ThemeModule,
     SettingsRoutingModule,
  ],
  declarations: [ 
    ...settingsroutedComponents,
  ],
  
})
export class SettingsModule { }
