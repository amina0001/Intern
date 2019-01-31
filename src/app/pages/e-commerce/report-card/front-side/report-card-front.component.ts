import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-report-card-front',
  styleUrls: ['./report-card-front.component.scss'],
  templateUrl: './report-card-front.component.html',
})
export class ReportCardFrontComponent implements OnDestroy {
  private alive = true;


  ngOnDestroy() {
    this.alive = false;
  }
}
