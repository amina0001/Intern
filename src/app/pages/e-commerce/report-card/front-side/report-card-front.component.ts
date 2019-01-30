import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { EarningService, PieChart } from '../../../../@core/data/earning.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-report-card-front',
  styleUrls: ['./report-card-front.component.scss'],
  templateUrl: './report-card-front.component.html',
})
export class ReportCardFrontComponent implements OnDestroy {
  private alive = true;

  earningPieChartData: PieChart[];
  name: string;
  color: string;
  value: number;
  defaultSelectedCurrency: string = 'Bitcoin';

  constructor(private earningService: EarningService ) {
    this.earningService.getEarningPieChartData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((earningPieChartData) => {
        this.earningPieChartData = earningPieChartData;
      });
  }

  changeChartInfo(pieData: {value: number; name: string; color: any}) {
    this.value = pieData.value;
    this.name = pieData.name;
    this.color = pieData.color;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
