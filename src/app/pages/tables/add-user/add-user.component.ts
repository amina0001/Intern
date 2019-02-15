import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

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

    public loading = false;

    model:user = new user();
      hiddenUS:boolean

 constructor(  private routers: Router,private UserService :UserService,private ngxService: NgxUiLoaderService)
 { this.hiddenUS=true
 
}
  addUser()
{ 
          this.loading = true;

  this.hiddenUS=true
//console.log(this.confirmPassword)
  // if(this.model.password ==this.confirmPassword)
  // {
    console.log("okk")
    this.UserService.addUser(this.model).subscribe(
      data =>  {
                     this.loading = false;

    },
     error=>{
        if(error['error'].text=='successful')
        {
                this.hiddenUS=false
                                  this.loading = false;

          console.log(error['error'].text)
         
        }else if(error['error'].text=='UserName already exists')
        { this.hiddenUS=false
          console.log(error['error'].text)
          
                          this.loading = false;

        }
      })
     
this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 1000);
 
    // OR
    this.ngxService.startBackground('do-background-things');
    // Do something here...
    this.ngxService.stopBackground('do-background-things');
 
    this.ngxService.startLoader('loader-01'); // start foreground spinner of the loader "loader-01" with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stopLoader('loader-01'); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    }, 1000);
  this.routers.navigate(['/pages/tables/smart-table']) 

}

 Back()
  {
  this.routers.navigate(['/pages/tables/smart-table']) 
  }
 
}
