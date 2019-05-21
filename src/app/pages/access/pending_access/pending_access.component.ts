
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
  selector: 'ngx-add-user',
  templateUrl: './pending_access.component.html',
 styleUrls: ['./pending_access.component.css'],
  styles: [`

   
    :host /deep/ .display {
      display:none;
      visibility: hidden;
    }
    :host /deep/ .width {
           width: 100%!important;
           border-right: none!important;
    }
    
  
  `],
     providers: [ AccessService]

})

export class pendingAccessComponent implements OnInit {

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



  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;

  settings = {

        actions: {
            add: false,
            edit: false,

            delete:false,
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


this.http.get<any[]>(this.apiUrl+'/formytek/public/api/authActiveAccess', { headers: this.reqHeader })
         .subscribe(
       
         (response) => {
            this.response = response;
            this.source.load(this.response);
      
         });

         }
}


/* Method:onCustomAction navigate user to the selected user for updating it*/
  onCustomAction(event) {
        this.event_id = event.data.id;
    this.event_data =event.data;

         this.AccessService.acceptAccess( this.event_id ).subscribe(
  data=>{
             $(".cdk-overlay-container").css('display','none');
               this.source.refresh();
              this.source.remove(this.event_data);
             var x = document.getElementById("snackbar3");
              x.className = "show";
             setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
  });
}
/* End of onCustomAction*/

/* Method:onDeleteConfirm :opens modal to delete users*/

 onDeleteConfirm(event): void {
  $("#Modal").modal('show');


    this.event_id = event.data.id;
    this.event_data =event.data;
}
/* End of onDeleteConfirm */
refuseAccess(id){
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