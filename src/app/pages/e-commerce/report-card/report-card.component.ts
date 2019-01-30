import { Component } from '@angular/core';

@Component({
  selector: 'ngx-report-card',
  styleUrls: ['./report-card.component.scss'],
  templateUrl: './report-card.component.html',
})
export class ReportCardComponent {

  flipped = false;

  toggleFlipView() {
    this.flipped = !this.flipped;
  }
}
