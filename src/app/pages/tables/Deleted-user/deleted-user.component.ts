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
     :host /deep/ ng2-smart-table tbody > tr > td:last-child  {
    height:30%!important;
    }
   :host /deep/ ng2-smart-table tbody > tr > td:last-child a i{
   padding-bottom:5%;
    font-size:17px!important;
    }
  :host /deep/ ng2-smart-table tbody > tr > td:last-child a:last-child i:hover {
    color:#2987e5!important;
    font-size:20px!important;
    }
    :host /deep/ ng2-smart-table tbody > tr > td:last-child a:first-child i:hover:first-child {
    color:#3f9684!important;
    font-size:20px!important;
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
