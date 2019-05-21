
import { Component, TemplateRef, ViewChild,OnInit   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbWindowService   } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';
declare var $ : any;
@Component({
  selector: 'ngx-add-user',
  templateUrl: './active-user.component.html',
 styleUrls: ['./active-user.component.css'],
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

  /******** Declarations variables ********/
  response: any=[];
  event_id: string;
  event_data:any;
  profile:any;
  reqHeader: any;
  apiUrl = environment.apiUrl;
  username:any;
  /******** End of Declarations variables ********/

   /******** Smart Table configuration ********/


  settings = {

       delete: {
      deleteButtonContent: '<i class="ion-trash-a "></i>',
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

      /******** End Of Smart Table configuration ********/

      constructor(  private http: HttpClient,
                     private routers: Router,
                     private UserService : UserService,
                     private windowService: NbWindowService,
                     private route: ActivatedRoute,
                     private LocalStorageService: LocalStorageService,
                     private authservice: AuthService,

                  ) {
                          this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this.authservice.authentication.token});
                        }



 async ngOnInit() {

     /**retrieve user from local storage**/
     this.username = this.LocalStorageService.retriveUserAccount();
  if(this.username.Login !="Administrator"){
      /** Get User Profile Of Auth **/

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

            /** applying the profile for the tabulation of the smart table**/   

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
                         /**End Of  applying the profile for the tabulation of the smart table**/   

             }else{
                           this.routers.navigate(['/pages/dashboard']) ;
            }

         });

}else if(this.username.Login =="Administrator"){
     this.http.get<any[]>(this.apiUrl+'/formytek/public/api/userliste1', { headers: this.reqHeader })
         .subscribe(
       
         (response) => {
            this.response = response;
            this.source.load(this.response);});
  }
}


/* Method:onCustomAction navigate user to the selected user for updating it*/
  onCustomAction(event) {
            this.routers.navigate(['/pages/users/update', {p1: event.data.Username}]) ;

}
/* End of onCustomAction*/

/* Method:onDeleteConfirm :opens modal to delete users*/

 onDeleteConfirm(event): void {
  $("#Modal").modal('show');

    this.event_id = event.data.Username;
    this.event_data =event.data;
}
/* End of onDeleteConfirm */

/* Method:onDeleteConfirm :opens modal to delete users*/

deleteUser(){
  this.UserService.deleteUser(this.event_id).subscribe();
  this.source.refresh();
  this.source.remove(this.event_data);
  $(".cdk-overlay-container").css('display','none');
   var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);

}
/* End of deleteUser */



}