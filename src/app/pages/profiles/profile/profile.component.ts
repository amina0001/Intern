import { Component,TemplateRef, ViewChild,OnInit } from '@angular/core';

declare var $ : any;
import { profile } from '../../../@core/models/profile.model';
import { ProfileService } from '../../../@core/data/profiles.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService   } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';

import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';

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
         providers: [ ProfileService]

})
export class ProfileComponent {
		profile:profile = new profile();
     response: any=[];
    event_id: string;
    event_data:any;
    profile_id: any;
    profil:any;
    reqHeader: any;
    apiUrl = environment.apiUrl;
     username:any;

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
               private windowService: NbWindowService,
               private route: ActivatedRoute,
               private LocalStorageService: LocalStorageService,
               private authservice: AuthService,) 
 {
          this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this.authservice.authentication.token});

   
   }

 async ngOnInit() {
 this.username = this.LocalStorageService.retriveUserAccount();
       if(this.username.Login !="Administrator"){

     await this.http.get(this.apiUrl+`/formytek/public/api/UserProfile/${this.username[0].Username}`,{ headers: this.reqHeader })
                          .toPromise().then(

                (response) => {
                    console.log( response['profile']);
                    this.profil = response['profile'];
                })
              
  await this.http.get<any[]>(this.apiUrl+'/formytek/public/api/Profile', { headers: this.reqHeader })
         .subscribe(
       
         (response) => {
            this.response = response;
                 if(response[0].error!="Not allowed")

{
             this.source.load(this.response);
        

     

        if(this.profil['update_profile']==1 && this.profil['delete_profile']==null){
                   setTimeout(function(){

               $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
                $("ng2-st-tbody-custom").addClass('width');
                console.log("up1");});

          
        }else if(this.profil['update_profile']==null) {
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
            });
       }
        if(this.profil['delete_profile']==null && this.profil['update_profile']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
               console.log("h1");
            });
       }
       if(this.profil['delete_profile']==1 && this.profil['update_profile']==1 ){
           
          setTimeout(function(){

            $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").removeClass('width');
                           });


        }
        else if(this.profil['delete_profile']==1 && this.profil['update_profile']==null){
             setTimeout(function(){
             $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("ng2-st-tbody-edit-delete").addClass('width');
              $("ng2-st-tbody-custom").css('border-right','none');
              $("ng2-st-tbody-edit-delete").css('margin-left','0%');

            console.log("heyy");
            });
             /* $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").addClass('width');*/

      }else if(this.profil['delete_profile']==null ){
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-edit-delete").removeClass('width');
                               console.log("del1");

            });
      }else if(this.profil['delete_profile']==null && this.profil['update_profile']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
                              console.log("h1");

            });
       }
       if(this.profil['add_profile']==1)
       {
          $(".add_profile").css('display','initial');

       }
        else{
         $(".add_profile").addClass('display');

        }
             var prof=this.profile;
    $(".ng2-smart-page-item").click(function(){

        if(prof['update_profile']==1 && prof['delete_profile']==null){
                   setTimeout(function(){

               $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
                $("ng2-st-tbody-custom").addClass('width');
                console.log("up1");});

          
        }else if(prof['update_profile']==null) {
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
            });
       }
        if(prof['delete_profile']==null && prof['update_profile']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
               console.log("h1");
            });
       }
       if(prof['delete_profile']==1 && prof['update_profile']==1 ){
           
          setTimeout(function(){

            $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").removeClass('width');
                           });


        }
        else if(prof['delete_profile']==1 && prof['update_profile']==null){
             setTimeout(function(){
             $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("ng2-st-tbody-edit-delete").addClass('width');
              $("ng2-st-tbody-custom").css('border-right','none');
              $("ng2-st-tbody-edit-delete").css('margin-left','0%');

            console.log("heyy");
            });
             /* $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").addClass('width');*/

      }else if(prof['delete_profile']==null ){
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-edit-delete").removeClass('width');
                               console.log("del1");

            });
      }else if(prof['delete_profile']==null && prof['update_profile']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
                              console.log("h1");

            });
       }
    });
   
   }else{
               this.routers.navigate(['/pages/dashboard']) ;
}

         });
       }  else if(this.username.Login =="Administrator"){
        this.http.get<any[]>(this.apiUrl+'/formytek/public/api/Profile', { headers: this.reqHeader })
         .subscribe(
       
         (response) => {
            this.response = response;
                 this.source.load(this.response);
        

          

  })
}
  }
  onCustomAction(event) {
 this.routers.navigate(['pages/profiles/update', {p1: event.data.id}]);
}

   onDeleteConfirm(event): void {
   $("#Modal").modal('show');

  this.profile_id=event.data.id;
  this.event_data =event.data;
}

deleteProfile(){
 this.ProfileService.deletePo(this.profile_id).subscribe();
  this.source.remove(this.event_data);
  
}
	


}