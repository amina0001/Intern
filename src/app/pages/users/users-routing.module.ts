import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { ActiveUserComponent } from './active-user/active-user.component';
import { DeletedUserComponent } from './Deleted-user/deleted-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [{
    path: 'active-user',
    component: ActiveUserComponent,
  },{
    path: 'deleted',
    component:DeletedUserComponent,
  },{
    path: 'add',
    component:AddUserComponent,
  },{
    path: 'update',
    component:UpdateUserComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }

export const routedComponents = [
  UsersComponent,
  ActiveUserComponent,
  DeletedUserComponent,
  AddUserComponent,
  UpdateUserComponent
];
