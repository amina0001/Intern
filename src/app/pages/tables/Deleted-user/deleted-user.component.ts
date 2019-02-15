import { Component, TemplateRef, ViewChild   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService } from '@nebular/theme';
import {BreadcrumbsService} from "ng6-breadcrumbs";
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

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
  :host /deep/ ng2-st-tbody-custom {
  
   width: 100%!important;
   border-left:none!important;
    }
  }
  `],
     providers: [ UserService ]

})
export class DeletedUserComponent {
    response: any=[];
    event_data:any;
    event_id: any;
    model:user = new user();

 @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;
  settings = {
  

      actions: {
  add: false,
  edit: false,
  delete:false,
  custom: [{ name: 'ourCustomAction', title: '<i class="fa fa-user-check"></i>' }],

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
               private UserService : UserService,
               private windowService: NbWindowService,
               private route: ActivatedRoute) {
             
      

        
      this.response =  this.UserService.deleteUsers().subscribe(result => {
                           this.response = result;
                           console.log("s"+this.response.id );
                            this.source.load(this.response);
                         });
       
      $(".cdk-overlay-container").css('display','none');

  
    }
  onCustomAction(event) {
    console.log(event.data.Username)
  this.UserService.ReactiveUser(event.data.Username).subscribe();
      this.event_data =event.data;

       this.source.remove(this.event_data);

  // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
}
ourshowAction(event) {

    this.windowService.open(
      this.disabledEscTemplate,
      {
        title: 'User:',
        hasBackdrop: true,
        closeOnEsc: true,
      },
    );
          $(".cdk-overlay-container").css('display','initial');

   this.model.username=event.data.Username
 
this.UserService.User( this.model.username).subscribe(data =>  {
   console.log("hey"+data[0]);
this.model.username=data[0].Username
this.model.firstname =data[0].FirstName
this.model.lastname =data[0].LastName
this.model.company =data[0].Company
this.model.officephone =data[0].OfficePhone
this.model.mail =data[0].EMailAddress
this.model.department=data[0].Department
this.model.cellphone=data[0].Mobile
this.model.JobTitle=data[0].JobTitle

  },
  (error)=>
  {
  });
 }
}
