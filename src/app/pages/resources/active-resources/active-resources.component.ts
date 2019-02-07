import { Component, TemplateRef, ViewChild, OnInit   } from '@angular/core';
declare var jquery:any;
declare var $ :any;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';

import { ResourceService } from '../../../@core/data/resources.service';
import { resource } from '../../../@core/models/resource.model';
import { Router, ActivatedRoute } from '@angular/router';

import { NbWindowService } from '@nebular/theme';
import {BreadcrumbsService} from "ng6-breadcrumbs";

@Component({
  selector: 'active_resource',
  templateUrl: './active-resources.component.html',
  styleUrls: ['./active-resources.component.css'],
  providers: [ ResourceService ]

})
export class ActiveResourcesComponent {
@ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;
  response: any=[];
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
   

 
      Categorize: {
        title: 'Categorize',
        type: 'string',
      },
      Status: {
        title: 'status',
        type: 'string',
      },
      Type: {
        title: 'type',
        type: 'string',
      },
      Name  : {
        title: 'Name',
        type: 'string',
      },
      Description: {
        title: 'Description',
        type: 'string',
      },
      Internal_information: {
        title: 'Internal informmation',
        type: 'string',
      },
      
     
     
    },
  };
   source: LocalDataSource = new LocalDataSource();

constructor( private http: HttpClient,
               private routers: Router,
               private breadcrumbs:BreadcrumbsService,
               private ResourceService : ResourceService,
               private windowService: NbWindowService,
               private route: ActivatedRoute) {
             
      

        
      this.response =  this.ResourceService.getAllResources().subscribe(result => {
                           this.response = result;
                           console.log(this.response );
                            this.source.load(this.response);
                         });
      console.log("hey"+this.response );
  
    }

  ngOnInit() {
   
    
 
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
