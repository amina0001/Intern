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
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';
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
     
    :host /deep/ .display {
      display:none;
      visibility: hidden;
    }
    :host /deep/ .width {
           width: 100%!important;
           border-right: none!important;
    }
  `],
  providers: [ ResourceService ]

})
export class ActiveResourcesComponent implements OnInit{
@ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;
  response: any=[];
  event_id: any;
  profile:any;
  reqHeader: any;
  apiUrl = environment.apiUrl;
  username:any;
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
               private route: ActivatedRoute,
               private LocalStorageService: LocalStorageService,
               private _auth_service: AuthService,) {
             
             this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});


  
    }

 async ngOnInit() {


          
   this.username = this.LocalStorageService.retriveUserAccount();
     await this.http.get(this.apiUrl+`/formytek/public/api/UserProfile/${this.username[0].Username}`,{ headers: this.reqHeader })
                          .toPromise().then(

                (response) => {
                    console.log( response['profile']);
                    this.profile = response['profile'];
         })
         this.http.get<any[]>(this.apiUrl+'/formytek/public/api/Ressources', { headers: this.reqHeader })
         .subscribe(
       
         (response) => {
            this.response = response;
                 if(response[0].error!="Not allowed")

              {
       
             this.source.load(this.response);

            
        if(this.profile['update_resource']==1 ){
                   setTimeout(function(){

               $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
                $("table > thead > tr ").removeClass('display').addClass('ng-star-inserted');

                $("ng2-st-tbody-custom").addClass('width');
                console.log("up1");});

          
        }else if(this.profile['update_resource']==null) {
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $(" ng2-st-tbody-custom").removeClass('width');
                $("table > thead > tr >th:last-child ").removeClass('ng-star-inserted').addClass('display');
                $("table > tbody > tr > td:last-child ").removeClass('ng-star-inserted').addClass('display');

            });
       }
       }else{
                 this.routers.navigate(['/pages/dashboard']) ;

}
   
      
         });

       if(this.profile['add_ressource']==1)
       {
          $(".add_ressource").css('display','initial');

       }
        else{
         $(".add_ressource").addClass('display');

        }
        
   
   
    var prof=this.profile;
    $(".ng2-smart-page-item").click(function(){

        if(prof['update_resource']==1 ){
                   setTimeout(function(){

               $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
                $("table > thead > tr ").removeClass('display').addClass('ng-star-inserted');

                $("ng2-st-tbody-custom").addClass('width');
                console.log("up1");});

          
        }else if(prof['update_resource']==null) {
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $(" ng2-st-tbody-custom").removeClass('width');
                $("table > thead > tr >th:last-child ").removeClass('ng-star-inserted').addClass('display');
                $("table > tbody > tr > td:last-child ").removeClass('ng-star-inserted').addClass('display');

            });
       }
       if(prof['add_ressource']==1)
       {
          $(".add_ressource").css('display','initial');

       }
        else{
         $(".add_ressource").addClass('display');

        }
    });
 
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
