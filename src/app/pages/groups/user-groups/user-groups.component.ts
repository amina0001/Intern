
import { Component, TemplateRef, ViewChild,OnInit   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService   } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GroupService } from '../../../@core/data/group.service';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';

declare var $ : any;
@Component({
  selector: 'ngx-user-groups',
  templateUrl: './user-groups.component.html',
  styles: [`

    :host /deep/ ng2-st-tbody-custom {
     width: 50%!important;
   
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
    providers: [ GroupService ]

})

export class UserGroupsComponent {
 
 response: any=[];
 event_id: string;
 event_data:any;
 username:any;
 reqHeader: any;
 apiUrl = environment.apiUrl;
 profile:any;

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
               private windowService: NbWindowService,
               private GroupService : GroupService,
               private route: ActivatedRoute,
               private LocalStorageService: LocalStorageService,
               private authservice: AuthService,
            ) {
             

   
    }
  async   ngOnInit() {

        this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this.authservice.authentication.token});
        this.username = this.LocalStorageService.retriveUserAccount();
          if(this.username.Login !="Administrator"){

           await this.http.get(this.apiUrl+`/formytek/public/api/UserProfile/${this.username[0].Username}`,{ headers: this.reqHeader })
                                .toPromise().then(

                      (response) => {
                          console.log( response['profile']);
                          this.profile = response['profile'];
               });

         await this.http.get<any[]>(this.apiUrl+'/formytek/public/api/getAllGroup', { headers: this.reqHeader })
               .subscribe(
             
               (response) => {
                  this.response = response;
                   this.source.load(this.response);
          
           if(response[0].error!="Not allowed")

  {
                  
   var prof=this.profile;
    $(".ng2-smart-page-item").click(function(){
      console.log("heree"+prof)
      if(prof['update_group']==1 && prof['delete_group']==null){
                   setTimeout(function(){

               $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
                $("ng2-st-tbody-custom").addClass('width');
                console.log("up1");});

          
        }else if(prof['update_group']==null) {
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
            });
       }
        if(prof['delete_group']==null && prof['update_group']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
               console.log("h1");
            });
       }
       if(prof['delete_group']==1 && prof['update_group']==1 ){
           
          setTimeout(function(){

            $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").removeClass('width');
                           });


        }
        else if(prof['delete_group']==1 && prof['update_group']==null){
             setTimeout(function(){
             $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("ng2-st-tbody-edit-delete").addClass('width');
              $("ng2-st-tbody-custom").css('border-right','none');
              $("ng2-st-tbody-edit-delete").css('margin-left','0%');

            console.log("heyy");
            });
            
      }else if(prof['delete_group']==null ){
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-edit-delete").removeClass('width');
                               console.log("del1");

            });
      }else if(prof['delete_group']==null && prof['update_group']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
                              console.log("h1");

            });
       }
       if(prof['add_group']==1)
       {            setTimeout(function(){

          $(".add_group").css('display','initial');
          });

       }
        else{
                      setTimeout(function(){

         $(".add_group").addClass('display');
});
      

        }
    }); 
              

        if(this.profile['update_group']==1 && this.profile['delete_group']==null){
                   setTimeout(function(){

               $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
                $("ng2-st-tbody-custom").addClass('width');
                console.log("up1");});

          
        }else if(this.profile['update_group']==null) {
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
            });
       }
        if(this.profile['delete_group']==null && this.profile['update_group']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
               console.log("h1");
            });
       }
       if(this.profile['delete_group']==1 && this.profile['update_group']==1 ){
           
          setTimeout(function(){

            $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").removeClass('width');
                           });


        }
        else if(this.profile['delete_group']==1 && this.profile['update_group']==null){
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

      }else if(this.profile['delete_group']==null ){
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-edit-delete").removeClass('width');
                               console.log("del1");

            });
      }else if(this.profile['delete_group']==null && this.profile['update_group']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
                              console.log("h1");

            });
       }
       if(this.profile['add_group']==1)
       {            setTimeout(function(){

          $(".add_group").css('display','initial');
          });

       }
        else{
                      setTimeout(function(){

         $(".add_group").addClass('display');
});
      

        }
        }else{
                 this.routers.navigate(['/pages/dashboard']) ;

}
      });
        }  else if(this.username.Login =="Administrator"){
     this.http.get<any[]>(this.apiUrl+'/formytek/public/api/getAllGroup', { headers: this.reqHeader })
         .subscribe(
       
         (response) => {
            this.response = response;
            this.source.load(this.response);});
  }
       
  }

  onCustomAction(event) {
            this.routers.navigate(['/pages/groups/update-groupe', {p1: event.data.Name}]) ;

}



 onDeleteConfirm(event): void {
     
  $("#Modal").modal('show');

  this.event_id = event.data.Name;
  this.event_data =event.data;

}

deleteGroup(){
  this.GroupService.deleteGroup(this.event_id).subscribe();
  this.source.refresh();
  this.source.remove(this.event_data);
  var x = document.getElementById("snackbar");
  x.className = "show";
 setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);

}



}