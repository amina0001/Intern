import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-users-card-front',
  styleUrls: ['./users-card-front.component.scss'],
  templateUrl: './users-card-front.component.html',
})
export class UsersCardFrontComponent implements OnDestroy {
  private alive = true;


  ngOnDestroy() {
    this.alive = false;
  }
}
