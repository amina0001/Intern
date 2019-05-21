import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { RecourcesRoutingModule, resourcesroutedComponents } from './resources-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageRenderComponent } from './active-resources/image-render.render.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
     RecourcesRoutingModule,
         NgxSpinnerModule,

  ],
  declarations: [
    ...resourcesroutedComponents,ImageRenderComponent
  ],
   entryComponents: [ImageRenderComponent,],
  providers: [
    
  ],
})
export class ResourcesModule { }
