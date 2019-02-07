import { Component } from '@angular/core';

@Component({
  selector: 'ngx-users-card',
  styleUrls: ['./users-card.component.scss'],
  templateUrl: './users-card.component.html',
})
export class UsersCardComponent {

  flipped = false;

  toggleFlipView() {
    this.flipped = !this.flipped;
  }
}
