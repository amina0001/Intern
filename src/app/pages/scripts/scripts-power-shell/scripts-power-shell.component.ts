import { Component, TemplateRef, ViewChild,ViewEncapsulation   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ScriptsPowerShellService } from '../../../@core/data/scripts-power-shell.service';
import { NbWindowService } from '@nebular/theme';
import {Router} from '@angular/router';

@Component({
  selector: 'scripts-power-shell',
  templateUrl: './scripts-power-shell.component.html',
  styles: [`
    :host /deep/ ng2-st-tbody-custom {
  
   width: 70%!important;
  
    }
 /deep/ .nb-theme-corporate ng2-smart-table .ng2-smart-actions ng2-st-tbody-custom a:nth-child(1) {
      width: 50%!important;

   position: absolute;
  }
 /deep/ .nb-theme-corporate ng2-smart-table .ng2-smart-actions ng2-st-tbody-custom a:nth-child(2) {
          width: 50%!important;
          margin-left: 50%;
  }
 
  `],
})
export class ScriptsPowerShellComponent{
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;
  settings = {
  delete: {
      deleteButtonContent: '<i class="ion-trash-a "></i>',
      confirmDelete: true
    },

   actions: {
        add: false,
        edit: false,

        custom: [{ name: 'executeConfirm', title: '<i class="nb-play " ></i>' },{ name: 'ourCustomAction', title: '<i class="nb-compose " >' }],
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

  constructor(private service: ScriptsPowerShellService,private windowService: NbWindowService,private router: Router) {
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
 onExecuteConfirm(event): void {
     this.router.navigate(['pages/scripts/execute-scripts']);

  }
}
