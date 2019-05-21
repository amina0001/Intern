import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from  'ngx-ui-loader';
import {NbTooltipModule} from '@nebular/theme';
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    ECommerceModule,
    NgxUiLoaderModule,
    NbTooltipModule,

  ],
  declarations: [
    ...PAGES_COMPONENTS,

  ],
})
export class PagesModule {
}
