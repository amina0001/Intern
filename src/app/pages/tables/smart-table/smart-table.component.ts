import { Component, TemplateRef, ViewChild   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './smart-table.component.html',
  styles: [`
    :host /deep/ ng2-st-tbody-custom {
  
   width: 50%!important;
    padding-left: 5%
    }


  `],
})

export class SmartTableComponent {

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

  custom: [{ name: 'ourCustomAction', title: '<i class="nb-compose"></i>' },],
  position: 'right'
},
    columns: {
   
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      
     
     
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService,private windowService: NbWindowService) {
    const data = this.service.getData();
    this.source.load(data);

  }

  onCustomAction(event) {
  // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
  console.log("custom");
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