
import { Component, TemplateRef, ViewChild,OnInit   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService   } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';

import {BreadcrumbsService} from "ng6-breadcrumbs";
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as $ from 'jquery';
@Component({
  selector: 'ngx-add-user',
  templateUrl: './active-user.component.html',
  styles: [`

    :host /deep/ ng2-st-tbody-custom {
     width: 50%!important;
   
    }

       

  `],
   providers: [ UserService]
})

export class ActiveUserComponent implements OnInit {
  response: any=[];
  event_id: string;
    event_data:any;

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
               private UserService : UserService,
               private windowService: NbWindowService,
               private route: ActivatedRoute,
            ) {
             
      

        
     
     /* this.response =  this.UserService.activeUsers().subscribe(result => {
                           this.response = result;
                           console.log("s"+this.response.id );
                            this.source.load(this.response);
                         });
            $(".cdk-overlay-container").css('display','none');

      console.log("hey"+this.response );*/
  
    }

  onCustomAction(event) {
            this.routers.navigate(['/pages/users/update', {p1: event.data.Username}]) ;
           // console.log(event.data.Username);

}


 onDeleteConfirm(event): void {
         $(".cdk-overlay-container").css('display','none');

  this.windowService.open(
      this.disabledEscTemplate,
      {
        title: 'Delete user',
        hasBackdrop: true,
        closeOnEsc: true,
      },
    );

      $(".cdk-overlay-container").css('display','initial');

  this.event_id = event.data.Username;
    this.event_data =event.data;

  //console.log("event"+this.event_id);
}

deleteUser(){
  //console.log("ssshhh"+this.event_id);
  this.UserService.deleteUser(this.event_id).subscribe();
  this.source.refresh();
     this.source.remove(this.event_data);

    $(".cdk-overlay-container").css('display','none');

 var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);

}
fade(){
     $(".cdk-overlay-container").css('display','none');


}

 ngOnInit() {

   let active_users = this.UserService.activeUsers().toPromise()
       .then(
         (response) => {
            this.response = response;
             this.source.load(this.response);
         });
     /* this.response =  this.UserService.activeUsers().subscribe(result => {
                           this.response = result;
                           console.log("s"+this.response.id );
                            this.source.load(this.response);
                         });*/
 
  }

}