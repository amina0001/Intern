
import { Component, TemplateRef, ViewChild,OnInit   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbWindowService   } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessService } from '../../../@core/data/access.service';
import { user } from '../../../@core/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';
declare var $ : any;

@Component({
  selector: 'ngx-active-access',
  templateUrl: './active_access.component.html',
 styleUrls: ['./active_access.component.css'],
  styles: [`

   :host /deep/ ng2-st-tbody-edit-delete {
     width:100%!important;
     margin-left:0%!important
   }
    :host /deep/ ng2-st-tbody-custom {
       width:0%!important;
       border:none!important;
   }

    :host /deep/ .display {
      display:none;
      visibility: hidden;
    }
    :host /deep/ .width {
           width: 100%!important;
           border-right: none!important;
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
  `],
     providers: [ AccessService]

})

export class activeAccessComponent implements OnInit {

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
      deleteButtonContent: '<i class="nb-close-circled"></i>',
      confirmDelete: true
    },
        actions: {
            add: false,
            edit: false,

            position: 'right'
            },
        columns: {
            id: {
                title: 'id',
                type: 'string',
              },
              username: {
                title: 'Username',
                type: 'string',
              },
              ressource_id: {
                title: 'Ressource Name',
                type: 'string',
              },
           
           },

  };

    source: LocalDataSource = new LocalDataSource();

      /******** End Of Smart Table configuration ********/

      constructor(  private http: HttpClient,
                     private routers: Router,
                     private AccessService : AccessService,
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
this.http.get<any[]>(this.apiUrl+'/formytek/public/api/active-access', { headers: this.reqHeader })
         .subscribe(
       
         (response) => {
            this.response = response;
            this.source.load(this.response);

                if(response[0].error!="Not allowed")

          {
              if(this.profile['reject_access']==1 ){
             setTimeout(function(){

               $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
         
              });

          
          }else {

               setTimeout(function(){
                $("table > tbody > tr >td:last-child ").addClass('display').removeClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").addClass('display').removeClass('ng-star-inserted');
                  });
         }

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




/* Method:onDeleteConfirm :opens modal to delete users*/

 onDeleteConfirm(event): void {
     $("#Modal").modal('show');

    this.event_id = event.data.id;
    this.event_data =event.data;
}
/* End of onDeleteConfirm */
refuseAccess(id){
console.log("id here"+id);
this.AccessService.refuseAccess(id).subscribe(
  data=>{
               this.source.refresh();
              this.source.remove(this.event_data);
             var x = document.getElementById("snackbar");
              x.className = "show";
             setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
  });
}




}