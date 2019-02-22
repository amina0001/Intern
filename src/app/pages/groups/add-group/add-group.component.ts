import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../../../@core/data/group.service';
import { group } from '../../../@core/models/group.model';

@Component({

  selector: 'ng-add-group',
  templateUrl: './add-group.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    

  `],
     providers: [ GroupService]

})
export class AddGroupComponent {

    confirmPassword:string="";
    model:group = new group();
      hiddenUS:boolean

 constructor(  private routers: Router,private ngxService: NgxUiLoaderService,private GroupService :GroupService,)
 {       this.confirmPassword="";


   this.hiddenUS=true
  
 
}
  addGroup()
{ 
      

  this.hiddenUS=true
//console.log(this.confirmPassword)
  // if(this.model.password ==this.confirmPassword)
  // {

    this.GroupService.AddGroup(this.model).subscribe(
      data =>  {
    },
     error=>{
         console.log(error['error'].text)
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
          console.log(error['error'].text)
         
        }else if(error['error'].text=='UserName already exists')
        { this.hiddenUS=false
          console.log(error['error'].text)
         

        }else{
           var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 9000);  
          console.log(error['error'].text)
        }
      })
}

 Back()
  {
  this.routers.navigate(['/pages/groups/users']) 
  }
 
}
