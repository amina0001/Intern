import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';

@Component({
  selector: 'deletd-user-table',
  templateUrl: './deleted-user.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    :host  /deep/ ng2-st-tbody-custom a i {
      font-size:17px;
    }
    /deep/ .nb-theme-corporate ng2-smart-table .ng2-smart-actions ng2-st-tbody-custom a:nth-child(2) {
          margin-left: 90%;
  }
  `],
})
export class DeletedUserComponent {

  settings = {
  

      actions: {
  add: false,
  edit: false,
  delete:false,
  custom: [{ name: 'ourCustomAction', title: '<i class="fa fa-eye"></i>' },{ name: 'ouraddAction', title: '<i class="fas fa-user-plus"></i>' },],
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

  constructor(private service: SmartTableService) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onCustomAction(event) {
  // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
  console.log("shit");
}
ourdeleteAction(event) {
  // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
  console.log("shit");
}
}
