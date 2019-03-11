import { Component, TemplateRef, ViewChild  } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'archived_resource',
  templateUrl: './archived-resources.component.html',
     styleUrls: ['./archived-resources.component.css'],

})
export class ArchivedResourcesComponent {
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
   

 
      categorize: {
        title: 'Categorize',
        type: 'string',
      },
      status: {
        title: 'status',
        type: 'string',
      },
      type: {
        title: 'type',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      internal: {
        title: 'Internal informmation',
        type: 'string',
      },
      
     
     
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private windowService: NbWindowService) {
    
  }

  onCustomAction(event) {
  // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
}

 onDeleteConfirm(event): void {
  this.windowService.open(
      this.disabledEscTemplate,
      {
        title: 'Delete active ressource',
        hasBackdrop: false,
        closeOnEsc: true,
      },
    );
}
}
