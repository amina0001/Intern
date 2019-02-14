import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScriptsComponent } from './scripts.component';
import { ScriptsPowerShellComponent } from './scripts-power-shell/scripts-power-shell.component';
import { AddScriptComponent } from './add-script/add-script.component';
import { ExecuteScriptComponent } from './execute-scripts/execute-scripts.component';
import { UpdateScriptComponent } from './update-script/update-script.component';

const routes: Routes = [{
  path: '',
  component: ScriptsComponent,
  children: [{
    path: 'scripts-power-shell',
    component: ScriptsPowerShellComponent,
  },
  {
    path: 'add-script',
    component: AddScriptComponent,
  },
  {
    path: 'execute-scripts',
    component: ExecuteScriptComponent,
  },{
    path: 'update-script',
    component: UpdateScriptComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScriptsRoutingModule { }

export const scriptsroutedComponents = [
  ScriptsComponent,
  ScriptsPowerShellComponent,
  AddScriptComponent,
  ExecuteScriptComponent,
  UpdateScriptComponent
];
