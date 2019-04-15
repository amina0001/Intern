/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { LocalStorageService } from './@core/data/local-storage.service';
import * as $ from 'jquery';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
  
})
export class AppComponent implements OnInit {
  profile:any;

  constructor(private analytics: AnalyticsService, private LocalStorageService: LocalStorageService,
) {
  	  this.profile=this.LocalStorageService.retriveUserProfile();

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
     
 
  }
}
