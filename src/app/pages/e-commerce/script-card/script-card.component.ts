import { Component } from '@angular/core';

@Component({
  selector: 'ngx-script-card',
    styleUrls: ['./script-card.component.scss'],

  templateUrl: './script-card.component.html',
})
export class ScriptCardComponent {

  flipped = false;

  toggleFlipView() {
    this.flipped = !this.flipped;
  }
}
