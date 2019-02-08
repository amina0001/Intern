import { Component, TemplateRef, ViewChild,OnInit   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService   } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';

import {BreadcrumbsService} from "ng6-breadcrumbs";
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './smart-table.component.html',
  styles: [`

    :host /deep/ ng2-st-tbody-custom {
     width: 50%!important;
    padding-left: 0%;
    }


  `],
   providers: [ UserService]
})

export class SmartTableComponent implements OnInit {
  response: any=[];
  event_id: any;
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

constructor(  private http: HttpClient,
               private routers: Router,
               private breadcrumbs:BreadcrumbsService,
               private ResourceService : UserService,
               private windowService: NbWindowService,
               private route: ActivatedRoute,
            ) {
             
      

        
      this.response =  this.ResourceService.activeUsers().subscribe(result => {
                           this.response = result;
                           console.log("s"+this.response.id );
                            this.source.load(this.response);
                         });
      console.log("hey"+this.response );
  
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
        hasBackdrop: true,
        closeOnEsc: true,
      },
    );

  this.event_id = event.data.Username;
  console.log("event"+this.event_id);
}

deleteResource(id){
  console.log(id);
  this.ResourceService.deleteUser(id).subscribe();
  this.source.refresh();
}

 ngOnInit() {
      this.response =  this.ResourceService.activeUsers().subscribe(result => {
                           this.response = result;
                           console.log("s"+this.response.id );
                            this.source.load(this.response);
                         });
 
  }

}