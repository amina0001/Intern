import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';

@Component({
  selector: 'ng-update-user',
  templateUrl: './update-user.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    

  `],
     providers: [ UserService]

})
export class UpdateUserComponent implements OnInit{
   apiUrl = environment.apiUrl;
   reqHeader: any;
   model:user = new user();
   sub:any;
   usernames:string;
   oldusername:string;
   profiles:any;
   profile:any;
   username:any;

 constructor( private http: HttpClient, private authservice: AuthService,private routers: Router,
   private UserService :UserService,private LocalStorageService: LocalStorageService,private route:ActivatedRoute, private spinner: NgxSpinnerService)
 {                    
          this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this.authservice.authentication.token});

}
async   ngOnInit() {
     this.username = this.LocalStorageService.retriveUserAccount();

       if(this.username.Login =="Administrator"){
      

         }else if(this.username.Login !="Administrator"){
               await  this.http.get(this.apiUrl+`/formytek/public/api/UserProfile/${this.username[0].Username}`,{ headers: this.reqHeader })
                
                .toPromise().then(

                (response) => {
                    this.profile = response['profile'];
                })

               console.log("hey"+this.profile)
                if(this.profile['update_user']!=1)
           {
              this.routers.navigate(['/pages/dashboard']) ;

           }
            
      }

    this.sub = this.route.snapshot.params['p1'];
    this.usernames = this.sub;
    this.oldusername=this.sub;
    this.spinner.show();

           

    await this.http.get(this.apiUrl+`/formytek/public/api/ProfileName`,{ headers: this.reqHeader })
                          .toPromise().then(

                data =>  {
                    this.profiles=data;

                })
                     this.http.get(this.apiUrl+`/formytek/public/api/User/${this.usernames}`,{ headers: this.reqHeader })
                          .subscribe(

                data =>  {
                    this.usernames=data[0].Username;
                    this.model.username=data[0].Username
                    this.model.firstname =data[0].FirstName
                    this.model.lastname =data[0].LastName
                    this.model.company =data[0].Company
                    this.model.officephone =data[0].OfficePhone
                    this.model.mail =data[0].EMailAddress
                    this.model.department=data[0].Department
                    this.model.cellphone=data[0].Mobile
                    this.model.JobTitle=data[0].JobTitle
                    this.model.profile=data[0].profile

                })
                       
                       this.spinner.hide();

                
    /*   this.UserService.profileName()
        .subscribe(  data =>  {
          this.profiles=data;
    });*/
 

  }

 updateUser(){ 
       this.spinner.show();

    this.UserService.uptadeUser(this.model).subscribe(data =>  {
     
  },
  (error)=>
  { 
      if(error['error'].text=="Success")
     { 
                              this.spinner.hide();

       
          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);
    }else{
                         this.spinner.hide();

         var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);
    }
                       this.spinner.hide();

      });

}
 Back()
  {
  this.routers.navigate(['/pages/users/active-user']) 
  }
 
}
