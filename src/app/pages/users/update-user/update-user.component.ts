import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
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
   
 constructor( private http: HttpClient, private authservice: AuthService,private routers: Router,private UserService :UserService,private route:ActivatedRoute,private ngxService: NgxUiLoaderService)
 {                    

}
async   ngOnInit() {
    
    this.sub = this.route.snapshot.params['p1'];
    this.usernames = this.sub;
    this.oldusername=this.sub;

      this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this.authservice.authentication.token});
           

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
                       
    
                
    /*   this.UserService.profileName()
        .subscribe(  data =>  {
          this.profiles=data;
    });*/
 

  }

 updateUser(){ 
    this.ngxService.start(); 
    this.UserService.uptadeUser(this.model).subscribe(data =>  {
     
  },
  (error)=>
  { 
      if(error['error'].text=="Success")
     { 
            this.ngxService.stop(); 
       
          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);
    }else{
         var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);
    }
      });

}
 Back()
  {
  this.routers.navigate(['/pages/users/active-user']) 
  }
 
}
