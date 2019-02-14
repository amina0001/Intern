import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ScriptsRoutingModule, scriptsroutedComponents } from './scripts-routing.module';
import { ScriptsPowerShellService } from '../../@core/data/scripts-power-shell.service';
import { ButtonRenderComponent } from './scripts-power-shell/button.render.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
     ScriptsRoutingModule,
  ],
  declarations: [ 
    ...scriptsroutedComponents,
    ButtonRenderComponent
  ],
    entryComponents: [ButtonRenderComponent,],

  providers: [
    ScriptsPowerShellService,
  ],
})
export class ScriptsModule { }
