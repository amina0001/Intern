import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../../../@core/data/group.service';
import { group } from '../../../@core/models/group.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';

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
   username:any;
    profile:any;
    reqHeader: any;
     apiUrl = environment.apiUrl;

 constructor(  private http: HttpClient,private authservice: AuthService,private LocalStorageService: LocalStorageService, private routers: Router, private spinner: NgxSpinnerService,private GroupService :GroupService,)
 { 
    this.confirmPassword="";
    this.hiddenUS=true
  
 
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

                if(this.profile['add_group']!=1)
           {
              this.routers.navigate(['/pages/dashboard']) ;

           }
            
      }
         
}
  addGroup()
{ 
      

  this.hiddenUS=true
 setTimeout(() => {
             this.spinner.show();
});
    this.GroupService.AddGroup(this.model).subscribe(
      data =>  {

         var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);  
                   this.spinner.hide();

    },
     error=>{
         this.hiddenUS=true
         
        if(error['error'].text=='Success')
        {this.hiddenUS=true
                

          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);  
         
        }else if(error['error'].text=='UserName already exists')
        { this.hiddenUS=false
                   this.spinner.hide();


        }else{
           var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);  
                   this.spinner.hide();

        }
      })
}

 Back()
  {
  this.routers.navigate(['/pages/groups/users']) 
  }
 
}
