import { Component,TemplateRef, ViewChild,OnInit } from '@angular/core';

import * as $ from 'jquery';
import { profile } from '../../../@core/models/profile.model';
import { ProfileService } from '../../../@core/data/profiles.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService   } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';

import {BreadcrumbsService} from "ng6-breadcrumbs";

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
 
  :host /deep/ ng2-smart-table table tr.ng2-smart-titles th:nth-child(1) {
      display:none!important;

  }
  :host /deep/ ng2-smart-table table tr td:nth-child(1) {
      display:none!important;

  }
   :host /deep/  ng2-smart-table thead tr.ng2-smart-filters th:nth-child(1) {
           display:none!important;


  `],
         providers: [ ProfileService]

})
export class ProfileComponent {
		profile:profile = new profile();
     response: any=[];
    event_id: string;
    event_data:any;
    profile_id: any;

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
   id: {
        title: 'id',
        type: 'string',
        filter:false
      },
      Name: {
        title: 'Name',
        type: 'string',
      },
     
      
     
     
    },
  };

    source: LocalDataSource = new LocalDataSource();
 constructor(private ProfileService: ProfileService,  private http: HttpClient,
               private routers: Router,
               private breadcrumbs:BreadcrumbsService,
               private windowService: NbWindowService,
               private route: ActivatedRoute,) 
 {
   
      this.response =  this.ProfileService.Profile().subscribe(result => {
                           this.response = result;
                            this.source.load(this.response);
                         });
   
   }

  onCustomAction(event) {
 this.routers.navigate(['pages/profiles/update', {p1: event.data.id}]);
}

   onDeleteConfirm(event): void {
  this.windowService.open(
      this.disabledEscTemplate,
      {
        title: 'Delete Profile',
        hasBackdrop: false,
        closeOnEsc: true,
      },
    );
        $(".cdk-overlay-container").css('display','initial');

  this.profile_id=event.data.id;
  this.event_data =event.data;
}

deleteProfile(){
  console.log("ssshhh"+this.profile_id);
 this.ProfileService.deletePo(this.profile_id).subscribe();
  this.source.remove(this.event_data);
    $(".cdk-overlay-container").css('display','none');

 
}
	
fade(){
     $(".cdk-overlay-container").css('display','none');


}

}