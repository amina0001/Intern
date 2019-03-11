import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-report-card-back',
  styleUrls: ['./report-card-back.component.scss'],
  templateUrl: './report-card-back.component.html',
})
export class ReportCardBackComponent implements OnDestroy {
    private alive = true;

  ngOnDestroy() {
    this.alive = false;
  }
}
