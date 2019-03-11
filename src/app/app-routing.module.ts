import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {NeedAuthGuard} from './auth.guard';
import {LoginComponent} from '../app/auth/login/login.component';


const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [NeedAuthGuard]
},
  {
    path: 'login',
    component: LoginComponent

  },
  {
    path: '',
    component: LoginComponent

  },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}