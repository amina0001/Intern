import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

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

    model:user = new user();
        sub:any;
        usernames:string;
        oldusername:string;

 constructor(  private routers: Router,private UserService :UserService,private route:ActivatedRoute,private ngxService: NgxUiLoaderService)
 {

}
  ngOnInit() {
    this.sub = this.route.snapshot.params['p1'];
      this.usernames = this.sub;
      this.oldusername=this.sub;
    //console.log("fff"+this.sub);
 this.UserService.User(this.sub).subscribe(data =>  {
   //console.log(data);
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
     // console.log("usern"+data[0].Username);

  },
  (error)=>
  {
  });
 //console.log("out"+this.usernames);
  }

 updateUser(){ 
//console.log(this.model)
      this.ngxService.start(); 

    this.UserService.uptadeUser(this.model).subscribe(data =>  {


     
  },
  (error)=>
  { 
     // console.log(error['error'].text);
    
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
