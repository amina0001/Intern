import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';
import { FormsModule } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({

  selector: 'ng-add-user',
  templateUrl: './add-user.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    

  `],
     providers: [ UserService]

})
export class AddUserComponent {

    confirmPassword:string="";
    model:user = new user();
    hiddenUS:boolean
    profiles:any;
 constructor(  private routers: Router,private UserService :UserService,private ngxService: NgxUiLoaderService)
 {       this.confirmPassword="";
         this.hiddenUS=true
        this.UserService.profileName()
        .subscribe(  data =>  {
          this.profiles=data;
    });

 
}
  addUser()
{ 
        

  this.hiddenUS=true
//console.log(this.confirmPassword)
  // if(this.model.password ==this.confirmPassword)
  // {
   // console.log("okk")
    this.UserService.addUser(this.model).subscribe(
      data =>  {
    },
     error=>{
         //console.log(error['error'].text)
         this.hiddenUS=true
         this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 700);
       
          // OR
          this.ngxService.startBackground('do-background-things');
          // Do something here...
          this.ngxService.stopBackground('do-background-things');
       
          this.ngxService.startLoader('loader-01'); 
          setTimeout(() => {
            this.ngxService.stopLoader('loader-01');
          }, 700);
        if(error['error'].text=='Success')
        {this.hiddenUS=true
                

          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);  
          //console.log(error['error'].text)
         
        }else if(error['error'].text=='UserName already exists')
        { this.hiddenUS=false
          //console.log(error['error'].text)
         

        }else{
           var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 9000);  
          //console.log(error['error'].text)
        }
      })


}

 Back()
  {
  this.routers.navigate(['/pages/users/active-user']) 
  }
 
}
