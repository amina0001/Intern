import { Component } from '@angular/core';

@Component({
  selector: 'ngx-settings-card',
    styleUrls: ['./settings-card.component.scss'],

  templateUrl: './settings-card.component.html',
})
export class SettingsCardComponent {

  flipped = false;

  toggleFlipView() {
    this.flipped = !this.flipped;
  }
}
