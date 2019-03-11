import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceComponent } from './e-commerce.component';

import { ChartModule } from 'angular2-chartjs';

import { SlideOutComponent } from './slide-out/slide-out.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ReportCardComponent } from './report-card/report-card.component';




import { ScriptCardComponent } from './script-card/script-card.component';
import { ScriptCardBackComponent } from './script-card/back-side/script-card-back.component';
import { ScriptCardFrontComponent } from './script-card/front-side/script-card-front.component';

import { ResourcesCardComponent } from './resources-card/resources-card.component';
import { ResourcesCardBackComponent } from './resources-card/back-side/resources-card-back.component';
import { ResourcesCardFrontComponent } from './resources-card/front-side/resources-card-front.component';


import { SettingsCardComponent } from './settings-card/settings-card.component';
import { SettingsCardBackComponent } from './settings-card/back-side/settings-card-back.component';
import { SettingsCardFrontComponent } from './settings-card/front-side/settings-card-front.component';

import { AccessCardComponent } from './access-card/access-card.component';
import { AccessCardBackComponent } from './access-card/back-side/access-card-back.component';
import { AccessCardFrontComponent } from './access-card/front-side/access-card-front.component';

import { UsersCardComponent } from './users-card/users-card.component';
import { UsersCardBackComponent } from './users-card/back-side/users-card-back.component';
import { UsersCardFrontComponent } from './users-card/front-side/users-card-front.component';

import { ReportCardBackComponent } from './report-card/back-side/report-card-back.component';
import { ReportCardFrontComponent } from './report-card/front-side/report-card-front.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    DragDropModule,
  ],
  declarations: [
    ECommerceComponent,
 
    SlideOutComponent,
  
    ReportCardFrontComponent,
    ReportCardBackComponent,
    ReportCardComponent,

    ScriptCardFrontComponent,
    ScriptCardBackComponent,
    ScriptCardComponent,

    SettingsCardFrontComponent,
    SettingsCardBackComponent,
    SettingsCardComponent,

    ResourcesCardFrontComponent,
    ResourcesCardBackComponent,
    ResourcesCardComponent,

    UsersCardFrontComponent,
    UsersCardBackComponent,
    UsersCardComponent,
   
    AccessCardFrontComponent,
    AccessCardBackComponent,
    AccessCardComponent,
   
  ],
  providers: [
  ],
})
export class ECommerceModule { }
