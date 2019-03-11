import { Component } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-settings-card-front',
    styleUrls: ['./settings-card-front.component.scss'],

  templateUrl: './settings-card-front.component.html',
})
export class SettingsCardFrontComponent {

  private alive = true;


}
 