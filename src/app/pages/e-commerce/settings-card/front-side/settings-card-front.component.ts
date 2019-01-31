import { Component } from '@angular/core';
import { ProfitBarAnimationChartService } from '../../../../@core/data/profit-bar-animation-chart.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-settings-card-front',
    styleUrls: ['./settings-card-front.component.scss'],

  templateUrl: './settings-card-front.component.html',
})
export class SettingsCardFrontComponent {

  private alive = true;

  linesData: { firstLine: number[]; secondLine: number[] };

  constructor(private profitBarAnimationChartService: ProfitBarAnimationChartService) {
    this.profitBarAnimationChartService.getChartData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((linesData) => {
        this.linesData = linesData;
      });
  }
}
 