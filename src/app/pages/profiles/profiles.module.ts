import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProfilesRoutingModule, profilesroutedComponents } from './profiles-routing.module';

@NgModule({
  imports: [
    ThemeModule,
     ProfilesRoutingModule,
  ],
  declarations: [ 
    ...profilesroutedComponents,
  ],
  
})
export class ProfilesModule { }
