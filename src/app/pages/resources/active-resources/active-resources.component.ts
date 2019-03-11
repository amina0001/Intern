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
  styles: [`
    :host /deep/ table th:nth-child(1){
    display:none!important;

    }
    :host /deep/ table td:nth-child(1){
    display:none!important;

    }
  :host /deep/ ng2-st-tbody-custom {
  
   width: 100%!important;
   border-left:none!important;
    }
     
  `],
  providers: [ ResourceService ]

})
export class ActiveResourcesComponent implements OnInit{
@ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;
  response: any=[];
  event_id: any;
  settings = {
 

   actions: {
  add: false,
  edit: false,
  delete: false,

  custom: [{ name: 'ourCustomAction', title: '<div><i class="nb-compose" >' },],
  position: 'right'
},
    columns: {
   
      id: {
        title: 'id',
     
        show:false,
      },
 
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
                          // console.log("s"+this.response.id );
                            this.source.load(this.response);
                         });
     // console.log("hey"+this.response );
  
    }

  ngOnInit() {
   
    
 
  }
onCustomAction(event) {
            this.routers.navigate(['/pages/resources/update', {p1: event.data.id}]) ;
           // console.log(event.data.Username);

}

/* onDeleteConfirm(event): void {
  this.windowService.open(
      this.disabledEscTemplate,
      {
        title: 'Delete active ressource',
        hasBackdrop: false,
        closeOnEsc: true,
      },
    );
  this.event_id = event.data.id;
}
deleteResource(id){
 // console.log(id);
this.ResourceService.DeleteUserRessources(id).subscribe();
}
 Back()
  {
     this.ngOnInit();
  }*/
}
