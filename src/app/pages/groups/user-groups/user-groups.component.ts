
import { Component, TemplateRef, ViewChild,OnInit   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService   } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';

import {BreadcrumbsService} from "ng6-breadcrumbs";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GroupService } from '../../../@core/data/group.service';

import * as $ from 'jquery';
@Component({
  selector: 'ngx-user-groups',
  templateUrl: './user-groups.component.html',
  styles: [`

    :host /deep/ ng2-st-tbody-custom {
     width: 50%!important;
   
    }

       

  `],
    providers: [ GroupService ]

})

export class UserGroupsComponent {
 
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
 
      Name: {
        title: 'Name',
        type: 'string',
      },
     
       Description: {
        title: 'Description',
        type: 'string',
      },
   
     
     
    },
  };

    source: LocalDataSource = new LocalDataSource();

constructor(  private http: HttpClient,
               private routers: Router,
               private breadcrumbs:BreadcrumbsService,
               private windowService: NbWindowService,
               private GroupService : GroupService,
               private route: ActivatedRoute,
            ) {
             
      
    
      this.response =  this.GroupService.Group().subscribe(result => {
                           this.response = result;
                           console.log("s"+this.response.id );
                            this.source.load(this.response);
                         });
   
    }
  onCustomAction(event) {
            this.routers.navigate(['/pages/groups/update-groupe', {p1: event.data.Name}]) ;
            console.log(event.data.Username);

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

  this.event_id = event.data.Name;
    this.event_data =event.data;

  console.log("event"+this.event_id);
}

deleteGroup(){
   console.log("ssshhh"+this.event_id);
  this.GroupService.deleteGroup(this.event_id).subscribe();
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
  
  }

}