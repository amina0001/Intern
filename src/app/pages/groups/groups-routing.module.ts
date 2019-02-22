import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsComponent } from './groups.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddUserGroupsComponent } from './add-user-to-group/add-user-to-group.component';
import { UpdateGroupComponent } from './update-groupe/update-groupe.component';
import { ListUserGroupsComponent } from './list-users/list-users.component';


const routes: Routes = [{
  path: '',
  component: GroupsComponent,
 children: [{
    path: 'users',
    component: UserGroupsComponent,
  },{
    path: 'add',
    component: AddGroupComponent,
  },{
    path: 'add-users',
    component: AddUserGroupsComponent,
  },{
    path: 'update-groupe',
    component: UpdateGroupComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule { }

export const routedComponents = [
  GroupsComponent,
UserGroupsComponent,
AddGroupComponent,
AddUserGroupsComponent,
UpdateGroupComponent,
ListUserGroupsComponent
];
