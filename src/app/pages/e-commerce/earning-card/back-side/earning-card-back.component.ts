import { Component, OnDestroy } from '@angular/core';
import { EarningService, PieChart } from '../../../../@core/data/earning.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-earning-card-back',
  styleUrls: ['./earning-card-back.component.scss'],
  templateUrl: './earning-card-back.component.html',
})
export class EarningCardBackComponent implements OnDestroy {
    private alive = true;

  ngOnDestroy() {
    this.alive = false;
  }
}
