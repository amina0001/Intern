import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ScriptsRoutingModule, scriptsroutedComponents } from './scripts-routing.module';
import { ScriptsPowerShellService } from '../../@core/data/scripts-power-shell.service';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
     ScriptsRoutingModule,
  ],
  declarations: [ 
    ...scriptsroutedComponents,
  ],
  providers: [
    ScriptsPowerShellService,
  ],
})
export class ScriptsModule { }
