import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: ECommerceComponent,
  },  {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  },{
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  },{
    path: 'resources',
    loadChildren: './resources/resources.module#ResourcesModule',
  },{
    path: 'scripts',
    loadChildren: './scripts/scripts.module#ScriptsModule',
  },{
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
  },{
    path: 'groups',
    loadChildren: './groups/groups.module#GroupsModule',
  }, {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
  }, 
   {
    path: 'profiles',
    loadChildren: './profiles/profiles.module#ProfilesModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
