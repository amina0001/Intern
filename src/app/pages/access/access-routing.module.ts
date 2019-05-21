import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessComponent } from './access.component';
import { toValidateComponent } from './to-validate/to-validate.component';
import { deletedAccessComponent } from './deleted_access/deleted_access.component';
import { activeAccessComponent } from './active_access/active_access.component';
import { pendingAccessComponent } from './pending_access/pending_access.component';

const routes: Routes = [{
  path: '',
  component: AccessComponent,
  children: [{
    path: 'to-validate',
    component: toValidateComponent,
  },{
    path: 'deleted_access',
    component:   deletedAccessComponent,
  },
{
    path: 'active_access',
    component:   activeAccessComponent,
  },
{
    path: 'pending_access',
    component:   pendingAccessComponent,
  },
   ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessRoutingModule { }

export const routedComponents = [
  AccessComponent,
 toValidateComponent,
 deletedAccessComponent,
 activeAccessComponent,
 pendingAccessComponent
];
