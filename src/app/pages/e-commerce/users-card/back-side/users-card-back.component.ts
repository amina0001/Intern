import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-users-card-back',
  styleUrls: ['./users-card-back.component.scss'],
  templateUrl: './users-card-back.component.html',
})
export class UsersCardBackComponent implements OnDestroy {
    private alive = true;

  ngOnDestroy() {
    this.alive = false;
  }
}
