import { Component, TemplateRef, ViewChild  } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ActiveResourcesService } from '../../../@core/data/active-resources.service';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'active_resource',
  templateUrl: './active-resources.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
 

  `],
})
export class ActiveResourcesComponent {
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

  constructor(private service: ActiveResourcesService,private windowService: NbWindowService) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onCustomAction(event) {
  // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
  console.log("hey");
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
