
import { Component, TemplateRef, ViewChild,OnInit   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService   } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';

import {BreadcrumbsService} from "ng6-breadcrumbs";
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';

import * as $ from 'jquery';
@Component({
  selector: 'ngx-add-user',
  templateUrl: './active-user.component.html',
  styles: [`

    :host /deep/ ng2-st-tbody-custom {
     width: 50%;
   
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
   providers: [ UserService]
})

export class ActiveUserComponent implements OnInit {
  response: any=[];
  event_id: string;
  event_data:any;
  profile:any;
  reqHeader: any;
   apiUrl = environment.apiUrl;

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
        mode: 'external',

  };

    source: LocalDataSource = new LocalDataSource();
    username:any;
constructor(  private http: HttpClient,
               private routers: Router,
               private breadcrumbs:BreadcrumbsService,
               private UserService : UserService,
               private windowService: NbWindowService,
               private route: ActivatedRoute,
               private LocalStorageService: LocalStorageService,
               private authservice: AuthService,

            ) {
                    this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this.authservice.authentication.token});

       

  }



 async ngOnInit() {


      this.username = this.LocalStorageService.retriveUserAccount();
     await this.http.get(this.apiUrl+`/formytek/public/api/UserProfile/${this.username[0].Username}`,{ headers: this.reqHeader })
                          .toPromise().then(

                (response) => {
                    this.profile = response['profile'];
                })
                
                 this.http.get<any[]>(this.apiUrl+'/formytek/public/api/userliste1', { headers: this.reqHeader })
         .subscribe(
       
         (response) => {
            this.response = response;
             this.source.load(this.response);
        
       if(response[0].error!="Not allowed")

{
        if(this.profile['update_user']==1 && this.profile['delete_user']==null){
                   setTimeout(function(){

               $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
                $("ng2-st-tbody-custom").addClass('width');
              });

          
        }else if(this.profile['update_user']==null) {
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
            });
       }
        if(this.profile['delete_user']==null && this.profile['update_user']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
            });
       }
       if(this.profile['delete_user']==1 && this.profile['update_user']==1 ){
           
          setTimeout(function(){

            $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").removeClass('width');
                           });


        }
        else if(this.profile['delete_user']==1 && this.profile['update_user']==null){
             setTimeout(function(){
             $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("ng2-st-tbody-edit-delete").addClass('width');
              $("ng2-st-tbody-custom").css('border-right','none');
              $("ng2-st-tbody-edit-delete").css('margin-left','0%');

            });
             /* $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").addClass('width');*/

      }else if(this.profile['delete_user']==null ){
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-edit-delete").removeClass('width');

            });
      }else if(this.profile['delete_user']==null && this.profile['update_user']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');

            });
       }
       if(this.profile['add_user']==1)
       {
          $(".add_user").css('display','initial');

       }
        else{
         $(".add_user").addClass('display');

        }
        
        var prof=this.profile;
 $(".ng2-smart-page-item").click(function(){

        if(prof['update_user']==1 && prof['delete_user']==null){
                   setTimeout(function(){

               $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
                $("ng2-st-tbody-custom").addClass('width');
          });

          
        }else if(prof['update_user']==null) {
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
            });
       }
        if(prof['delete_user']==null && prof['update_user']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
            });
       }
       if(prof['delete_user']==1 && prof['update_user']==1 ){
           
          setTimeout(function(){

            $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").removeClass('width');
                           });


        }
        else if(prof['delete_user']==1 && prof['update_user']==null){
             setTimeout(function(){
             $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("ng2-st-tbody-edit-delete").addClass('width');
              $("ng2-st-tbody-custom").css('border-right','none');
              $("ng2-st-tbody-edit-delete").css('margin-left','0%');

            });
             /* $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").addClass('width');*/

      }else if(prof['delete_user']==null ){
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-edit-delete").removeClass('width');

            });
      }else if(prof['delete_user']==null && prof['update_user']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted*').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');

            });
       }
    });
 }else{
               this.routers.navigate(['/pages/dashboard']) ;
}

         });
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


}