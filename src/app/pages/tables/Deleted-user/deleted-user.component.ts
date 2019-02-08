import { Component, TemplateRef, ViewChild   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService } from '@nebular/theme';
import {BreadcrumbsService} from "ng6-breadcrumbs";
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
     providers: [ UserService ]

})
export class DeletedUserComponent {
response: any=[];
  event_id: any;
  settings = {
  

      actions: {
  add: false,
  edit: false,
  delete:false,
  custom: [{ name: 'ourCustomAction', title: '<i class="fa fa-eye"></i>' },{ name: 'ouraddAction', title: '<i class="fas fa-user-plus"></i>' },],
  position: 'right'
},

     columns: {
 
      FirstName: {
        title: 'First Name',
        type: 'string',
      },
      LastName: {
        title: 'Last Name',
        type: 'string',
      },
      Username: {
        title: 'Username',
        type: 'string',
      },
      
     
     
    },
  };

   source: LocalDataSource = new LocalDataSource();

constructor( private http: HttpClient,
               private routers: Router,
               private breadcrumbs:BreadcrumbsService,
               private ResourceService : UserService,
               private windowService: NbWindowService,
               private route: ActivatedRoute) {
             
      

        
      this.response =  this.ResourceService.deleteUsers().subscribe(result => {
                           this.response = result;
                           console.log("s"+this.response.id );
                            this.source.load(this.response);
                         });
      console.log("hey"+this.response );
  
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
