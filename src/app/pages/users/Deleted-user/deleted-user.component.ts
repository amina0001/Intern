import { Component, TemplateRef, ViewChild  ,OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $ : any;
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';

@Component({
  selector: 'deletd-user-table',
  templateUrl: './deleted-user.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    :host  /deep/ ng2-st-tbody-custom a i {
      font-size:17px;
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
  }
  `],
     providers: [ UserService ]

})
export class DeletedUserComponent implements OnInit {
    response: any=[];
    event_data:any;
    event_id: any;
    model:user = new user();
    profile:any;
    reqHeader: any;
    username: any;
    apiUrl = environment.apiUrl;    

  settings = {
  

      actions: {
  add: false,
  edit: false,
  delete:false,
  custom: [{ name: 'ourCustomAction', title: '<i class="fa fa-user-check"></i>' }],

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

constructor( private http: HttpClient,
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
 this.username = this.LocalStorageService.retriveUserAccount();
   if(this.username.Login !="Administrator"){

     await this.http.get(this.apiUrl+`/formytek/public/api/UserProfile/${this.username[0].Username}`,{ headers: this.reqHeader })
                          .toPromise().then(

                (response) => {
                    console.log( response['profile']);
                    this.profile = response['profile'];
                });
              

   this.http.get<any[]>(this.apiUrl+'/formytek/public/api/userliste2', { headers: this.reqHeader })
         .subscribe(
       
         (response) => {
            this.response = response;
             this.source.load(this.response);
             if(response[0].error!="Not allowed")

{

       
           
       
      $(".cdk-overlay-container").css('display','none');

      if(this.profile['renew_user']==null){
       setTimeout(function(){

  $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
 $("table > thead > tr >th:last-child ").removeClass('ng-star-inserted').addClass('display');           

    });
    }
  

        var prof=this.profile;
        $(".ng2-smart-page-item").click(function(){

      if(prof['renew_user']==null){
       setTimeout(function(){


  $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
 $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');           
           

    });
    }
 
     
   });

}else{
                 this.routers.navigate(['/pages/dashboard']) ;

}
         });
       }  else if(this.username.Login =="Administrator"){
     this.http.get<any[]>(this.apiUrl+'/formytek/public/api/userliste2', { headers: this.reqHeader })
         .subscribe(
       
         (response) => {
            this.response = response;
            this.source.load(this.response);});
  }

 }
  onCustomAction(event) {
   $("#Modal").modal('show');

  
  this.event_id = event.data.Username;
    this.event_data =event.data;
}

deleteUser(){
   
  this.UserService.ReactiveUser(this.event_id ).subscribe();

       this.source.remove(this.event_data);

    $(".cdk-overlay-container").css('display','none');

 var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);

}
fade(){
     $(".cdk-overlay-container").css('display','none');


}

ourshowAction(event) {
        
          
   this.model.username=event.data.Username
 
this.UserService.User( this.model.username).subscribe(data =>  {
//   console.log("hey"+data[0]);
this.model.username=data[0].Username
this.model.firstname =data[0].FirstName
this.model.lastname =data[0].LastName
this.model.company =data[0].Company
this.model.officephone =data[0].OfficePhone
this.model.mail =data[0].EMailAddress
this.model.department=data[0].Department
this.model.cellphone=data[0].Mobile
this.model.JobTitle=data[0].JobTitle

  },
  (error)=>
  {
  });
 }
}
