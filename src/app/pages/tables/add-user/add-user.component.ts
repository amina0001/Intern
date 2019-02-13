import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    model:user = new user();

 constructor(  private routers: Router,private UserService :UserService)
 {

}
  addUser()
{
//console.log(this.confirmPassword)
  // if(this.model.password ==this.confirmPassword)
  // {
    console.log("okk")
    this.UserService.addUser(this.model).subscribe(data =>  {
     
    }),
    (error)=>
    {    console.log("erreur",error)

      
               console.log("A exists")

    //console.log(error);
    };
    //this.toasterService.pop('error', 'Args Title', 'Args Body');
  // }
    //  this.routers.navigate(['/pages/tables/smart-table']) 

}
 updateUser(){ 
console.log(this.model)
    this.UserService.uptadeUser(this.model).subscribe(data =>  {
  },
  (error)=>
  {
  });
}
 Back()
  {
  this.routers.navigate(['/pages/tables/smart-table']) 
  }
 
}
