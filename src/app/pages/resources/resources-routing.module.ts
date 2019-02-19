import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecourcesComponent } from './resources.component';
import { ActiveResourcesComponent } from './active-resources/active-resources.component';
import { AddActiveResourcesComponent } from './add-active-resources/add-active-resources.component';
import { AddActionResourcesComponent } from './add-action-resources/add-action-resources.component';
import { ArchivedResourcesComponent } from './archived-resources/archived-resources.component';
import { UpdateActiveResourcesComponent } from './update-active-resources/update-active-resources.component';

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
  },{
    path: 'archived-resources',
    component: ArchivedResourcesComponent,
  },{
    path: 'update',
    component: UpdateActiveResourcesComponent,
  },],
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
  ArchivedResourcesComponent,
  UpdateActiveResourcesComponent
];
