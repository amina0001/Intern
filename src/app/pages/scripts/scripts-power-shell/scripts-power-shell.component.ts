import { Component, TemplateRef, ViewChild   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ScriptsPowerShellService } from '../../../@core/data/scripts-power-shell.service';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'scripts-power-shell',
  templateUrl: './scripts-power-shell.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }

  `],
})
export class ScriptsPowerShellComponent{
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;
  settings = {
  delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },

   actions: {
        add: false,
        edit: false,

        custom: [{ name: 'ourCustomAction', title: '<div><i class="nb-compose" >' },],
        position: 'right'
    },
    columns: {
      Name: {
        title: 'Name',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ScriptsPowerShellService,private windowService: NbWindowService) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onCustomAction(event) {
  // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
  console.log("shit");
}

 
 onDeleteConfirm(event): void {
  this.windowService.open(
      this.disabledEscTemplate,
      {
        title: 'Delete user',
        hasBackdrop: false,
        closeOnEsc: true,
      },
    );
}
}
