import { Component } from '@angular/core';

@Component({
  selector: 'ngx-access-card',
    styleUrls: ['./access-card.component.scss'],

  templateUrl: './access-card.component.html',
})
export class AccessCardComponent {

  flipped = false;

  toggleFlipView() {
    this.flipped = !this.flipped;
  }
}
