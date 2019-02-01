import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceComponent } from './e-commerce.component';
import { ECommerceChartsPanelComponent } from './charts-panel/charts-panel.component';
import { OrdersChartComponent } from './charts-panel/charts/orders-chart.component';
import { ProfitChartComponent } from './charts-panel/charts/profit-chart.component';
import { ChartPanelHeaderComponent } from './charts-panel/chart-panel-header/chart-panel-header.component';
import { ChartPanelSummaryComponent } from './charts-panel/chart-panel-summary/chart-panel-summary.component';
import { ChartModule } from 'angular2-chartjs';
import { TrafficBarComponent } from './traffic-reveal-card/front-side/traffic-bar/traffic-bar.component';
import { TrafficFrontCardComponent } from './traffic-reveal-card/front-side/traffic-front-card.component';
import { TrafficCardsHeaderComponent } from './traffic-reveal-card/traffic-cards-header/traffic-cards-header.component';
import { TrafficBackCardComponent } from './traffic-reveal-card/back-side/traffic-back-card.component';
import { TrafficBarChartComponent } from './traffic-reveal-card/back-side/traffic-bar-chart.component';
import {
  ECommerceVisitorsAnalyticsComponent,
} from './visitors-analytics/visitors-analytics.component';
import {
  ECommerceVisitorsAnalyticsChartComponent,
} from './visitors-analytics/visitors-analytics-chart/visitors-analytics-chart.component';
import {
  ECommerceVisitorsStatisticsComponent,
} from './visitors-analytics/visitors-statistics/visitors-statistics.component';
import { ECommerceLegendChartComponent } from './legend-chart/legend-chart.component';
import { ECommerceUserActivityComponent } from './user-activity/user-activity.component';
import { ECommerceProgressSectionComponent } from './progress-section/progress-section.component';
import { SlideOutComponent } from './slide-out/slide-out.component';

import { CountryOrdersComponent } from './country-orders/country-orders.component';
import { CountryOrdersMapComponent } from './country-orders/map/country-orders-map.component';
import { CountryOrdersMapService } from './country-orders/map/country-orders-map.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CountryOrdersChartComponent } from './country-orders/chart/country-orders-chart.component';
import { UsersCardComponent } from './users-card/users-card.component';
import { ReportCardComponent } from './report-card/report-card.component';

import { UsersCardBackComponent } from './users-card/back-side/users-card-back.component';
import { UsersCardFrontComponent } from './users-card/front-side/users-card-front.component';


import { AccessCardComponent } from './access-card/access-card.component';
import { AccessCardBackComponent } from './access-card/back-side/access-card-back.component';
import { AccessCardFrontComponent } from './access-card/front-side/access-card-front.component';


import { ScriptCardComponent } from './script-card/script-card.component';
import { ScriptCardBackComponent } from './script-card/back-side/script-card-back.component';
import { ScriptCardFrontComponent } from './script-card/front-side/script-card-front.component';

import { ResourcesCardComponent } from './resources-card/resources-card.component';
import { ResourcesCardBackComponent } from './resources-card/back-side/resources-card-back.component';
import { ResourcesCardFrontComponent } from './resources-card/front-side/resources-card-front.component';


import { SettingsCardComponent } from './settings-card/settings-card.component';
import { SettingsCardBackComponent } from './settings-card/back-side/settings-card-back.component';
import { SettingsCardFrontComponent } from './settings-card/front-side/settings-card-front.component';

import { ReportCardBackComponent } from './report-card/back-side/report-card-back.component';
import { ReportCardFrontComponent } from './report-card/front-side/report-card-front.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDropOverviewExample } from './drag-drop/drag-drop.component';

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
   CdkDragDropOverviewExample,
    ECommerceComponent,
    ECommerceChartsPanelComponent,
    ChartPanelHeaderComponent,
    ChartPanelSummaryComponent,
    OrdersChartComponent,
    ProfitChartComponent,
    TrafficBarChartComponent,
    TrafficFrontCardComponent,
    TrafficBackCardComponent,
    TrafficBarComponent,
    TrafficCardsHeaderComponent,
    CountryOrdersComponent,
    CountryOrdersMapComponent,
    CountryOrdersChartComponent,
    ECommerceVisitorsAnalyticsComponent,
    ECommerceVisitorsAnalyticsChartComponent,
    ECommerceVisitorsStatisticsComponent,
    ECommerceLegendChartComponent,
    ECommerceUserActivityComponent,
    ECommerceProgressSectionComponent,
    SlideOutComponent,
    UsersCardComponent,
    UsersCardFrontComponent,
    UsersCardBackComponent,
    ReportCardFrontComponent,
    ReportCardBackComponent,
    ReportCardComponent,
    AccessCardFrontComponent,
    AccessCardBackComponent,
    AccessCardComponent,
    ScriptCardFrontComponent,
    ScriptCardBackComponent,
    ScriptCardComponent,
    SettingsCardFrontComponent,
    SettingsCardBackComponent,
    SettingsCardComponent,
    ResourcesCardFrontComponent,
    ResourcesCardBackComponent,
    ResourcesCardComponent,
   
  ],
  providers: [
    CountryOrdersMapService,
  ],
})
export class ECommerceModule { }
