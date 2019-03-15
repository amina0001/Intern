import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilesComponent } from './profiles.component';
import { ProfileComponent } from './profile/profile.component';
import { AddProfileComponent } from './add_profile/add_profile.component';
import { UpdateProfileComponent } from './update_profile/update_profile.component';
import { AddUserProfilesComponent } from './add-user-to-profile/add-user-to-profile.component';

const routes: Routes = [{
  path: '',
  component: ProfilesComponent,
  children: [{
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'add_profile',
    component: AddProfileComponent,
  },
  {
    path: 'update',
    component: UpdateProfileComponent,
  },
  {
    path: 'add-user-to-profile',
    component: AddUserProfilesComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule { }

export const profilesroutedComponents = [
  ProfilesComponent,
  ProfileComponent,
  AddProfileComponent,
  UpdateProfileComponent,
  AddUserProfilesComponent
];
