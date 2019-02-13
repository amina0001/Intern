import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

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
 constructor(  private routers: Router,private UserService :UserService,private route:ActivatedRoute)
 {

}
  ngOnInit() {
    this.sub = this.route.snapshot.params['p1'];
      this.usernames = this.sub;
    console.log("fff"+this.sub);
 this.UserService.User(this.sub).subscribe(data =>  {
   console.log("hey"+data[0]);
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
      console.log("usern"+data[0].Username);

  },
  (error)=>
  {
  });
 console.log("out"+this.usernames);
  }

 updateUser(){ 
console.log(this.model)
    this.UserService.uptadeUser(this.model).subscribe(data =>  {
  },
  (error)=>
  {
  });
       //   this.routers.navigate(['/pages/tables/smart-table']) 

}
 Back()
  {
  this.routers.navigate(['/pages/tables/smart-table']) 
  }
 
}
