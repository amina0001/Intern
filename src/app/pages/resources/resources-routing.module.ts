import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecourcesComponent } from './resources.component';
import { ActiveResourcesComponent } from './active-resources/active-resources.component';
import { AddActiveResourcesComponent } from './add-active-resources/add-active-resources.component';
import { AddActionResourcesComponent } from './add-action-resources/add-action-resources.component';

const routes: Routes = [{
  path: '',
  component: RecourcesComponent,
  children: [{
    path: 'active-resources',
    component: ActiveResourcesComponent,
  },{
    path: 'add-active-resources',
    component: AddActiveResourcesComponent,
  },{
    path: 'add-action-resources',
    component: AddActionResourcesComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecourcesRoutingModule { }

export const resourcesroutedComponents = [
  RecourcesComponent,
  ActiveResourcesComponent,
  AddActiveResourcesComponent,
  AddActionResourcesComponent,
];
