import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [{
  path: '',
  component: SettingsComponent,
  children: [{
    path: 'configuration',
    component: ConfigurationComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }

export const settingsroutedComponents = [
  SettingsComponent,
  ConfigurationComponent,
];
