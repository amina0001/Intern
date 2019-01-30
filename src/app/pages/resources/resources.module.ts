import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { RecourcesRoutingModule, resourcesroutedComponents } from './resources-routing.module';
import { ActiveResourcesService } from '../../@core/data/active-resources.service';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
     RecourcesRoutingModule,
  ],
  declarations: [
    ...resourcesroutedComponents,
  ],
  providers: [
    ActiveResourcesService,
  ],
})
export class ResourcesModule { }
