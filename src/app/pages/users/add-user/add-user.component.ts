import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';
import { FormsModule } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';

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
    username:any;
    profile:any;
    reqHeader: any;
     apiUrl = environment.apiUrl;

 constructor( private http: HttpClient,private authservice: AuthService,private LocalStorageService: LocalStorageService,
 private routers: Router,private spinner: NgxSpinnerService, 
private UserService :UserService)
 {      
        
 
}
 async ngOnInit() {
     this.username = this.LocalStorageService.retriveUserAccount();
          this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this.authservice.authentication.token});

       if(this.username.Login =="Administrator"){
       
      
         }else if(this.username.Login !="Administrator"){
               await  this.http.get(this.apiUrl+`/formytek/public/api/UserProfile/${this.username[0].Username}`,{ headers: this.reqHeader })
                
                .toPromise().then(

                (response) => {
                    this.profile = response['profile'];
                })

               console.log("hey"+this.profile)
                if(this.profile['add_user']!=1)
           {
              this.routers.navigate(['/pages/dashboard']) ;

           }
            
      }
         this.confirmPassword="";
         this.hiddenUS=true
         this.UserService.profileName()
        .subscribe(  data =>  {
          this.profiles=data;
          });
         
}
  addUser()
{ 
        
  this.hiddenUS=true
    this.spinner.show();
     

       
    this.UserService.addUser(this.model).subscribe(
      data =>  {

    },
     error=>{
     
         //console.log(error['error'].text)
         this.hiddenUS=true
        if(error['error'].text=='Success')
        {
                 setTimeout(() => {
        
        this.spinner.hide();
});
          this.hiddenUS=true     
          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);  
        }
           else if(error['error'].text=='UserName already exists')
        { 
       setTimeout(() => {
        
        this.spinner.hide();
});
          this.hiddenUS=false
          
        }
          else{
                   setTimeout(() => {
        
        this.spinner.hide();
});
           var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);  
          //console.log(error['error'].text)
        }
               setTimeout(() => {
        
        this.spinner.hide();
});
      })

          
}

 Back()
  {
  this.routers.navigate(['/pages/users/active-user']) 
  }
 
}
