import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ScriptsRoutingModule, scriptsroutedComponents } from './scripts-routing.module';
import { ScriptsPowerShellService } from '../../@core/data/scripts-power-shell.service';
import { ButtonRenderComponent } from './scripts-power-shell/button.render.component';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  imports: [
    TagInputModule, 
    ThemeModule,
    Ng2SmartTableModule,
    ScriptsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,


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
