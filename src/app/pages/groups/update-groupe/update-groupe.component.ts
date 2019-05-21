import { Component,OnInit} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../../../@core/data/group.service';
import { group } from '../../../@core/models/group.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';
@Component({

  selector: 'ng-update-group',
  templateUrl: './update-groupe.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    

  `],
     providers: [ GroupService]

})
export class UpdateGroupComponent implements OnInit{

    model:group = new group();
    sub:any;
    name:string;
    profile:any;
    reqHeader: any;
    username:any;
    apiUrl = environment.apiUrl;

 constructor(  private routers: Router,private GroupService :GroupService,private http: HttpClient,private authservice: AuthService,private LocalStorageService: LocalStorageService,private route:ActivatedRoute, private spinner: NgxSpinnerService)
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

                if(this.profile['update_group']!=1)
           {
              this.routers.navigate(['/pages/dashboard']) ;

           }
            
      }
         
    this.sub = this.route.snapshot.params['p1'];
    this.name = this.sub;
    this.spinner.show();
   this.GroupService.getGroup(this.sub).subscribe(data =>  {
   this.model.Name=data[0].Name
   this.model.Description =data[0].Description
                   this.spinner.hide();


  },
  (error)=>
  {
                       this.spinner.hide();

  });
  }

 updateGroup(){ 
setTimeout(() => {
             this.spinner.show();
});
    this.GroupService.UpdateGroup(this.model).subscribe(data =>  {
                   this.spinner.hide();

         var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);  
     
  },
  (error)=>
  { 
    
      if(error['error'].text=="Success")
     {                    this.spinner.hide();

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
  this.routers.navigate(['/pages/groups/users']) 
  }
 
}
