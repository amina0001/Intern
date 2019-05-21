/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NeedAuthGuard} from './auth.guard';

import {RouterModule, Routes} from '@angular/router';

import { AuthInterceptor } from '../app/_helpers/AuthInterceptor';
import { LocalStorageService } from "./@core/data/local-storage.service";
import { NgxSpinnerModule } from 'ngx-spinner';

import { LoginComponent } from '../app/auth/login/login.component';
import { TagInputModule } from 'ngx-chips';


@NgModule({
  declarations: [AppComponent,   LoginComponent
],
  imports: [  
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    HttpClientModule, // import HttpClientModule
    ReactiveFormsModule,
    TagInputModule,
    NgxSpinnerModule
  ],

  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }, 
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
        LocalStorageService,
      {
          provide: LocationStrategy,
          useClass: HashLocationStrategy
      },
  ],
})
export class AppModule {
}