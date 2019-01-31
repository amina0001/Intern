import { Component } from '@angular/core';

@Component({
  selector: 'ngx-resources-card',
  styleUrls: ['./resources-card.component.scss'],
  templateUrl: './resources-card.component.html',
})
export class ResourcesCardComponent {

    flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }
}
