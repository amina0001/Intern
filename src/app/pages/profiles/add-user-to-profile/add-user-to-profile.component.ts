
import { Component, TemplateRef,OnInit , ViewChild,ViewEncapsulation  } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService   } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

import {BreadcrumbsService} from "ng6-breadcrumbs";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from '../../../@core/data/profiles.service';
import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';
 declare let $: any;
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';

import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';

@Component({
  selector: 'ngx-add-user-to-profile',
  templateUrl: './add-user-to-profile.component.html',
     providers: [ ProfileService],

})

export class AddUserProfilesComponent implements OnInit{
 @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;
 todo:string[]; 
done:string[]; 
count:number; 
counter:number; 
Username:any; 
Name:any;
Usernamed:any; 
Named:string="";  
// pager object
pager: any = {};
classid:string=""; 
// paged items
pagedItems: any[];
LIST_IDS:string[]; 
response:any;
private allItems: any[];
apiUrl = environment.apiUrl;
reqHeader: any;
destId:any;
usernam:any;
profile:any;
constructor(  private http: HttpClient,
               private routers: Router,
               private breadcrumbs:BreadcrumbsService,
               private windowService: NbWindowService,
               private route: ActivatedRoute,
               private _auth_service: AuthService,
               private ProfileService :ProfileService,
               private ngxService: NgxUiLoaderService,
               private LocalStorageService: LocalStorageService,

            ) {
    
    this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});

    }

async ngOnInit(){

this.todo=[];
this.done=[];
this.LIST_IDS=[];
this.count=0;
this.counter=0;

       
     this.usernam = this.LocalStorageService.retriveUserAccount();
     await this.http.get(this.apiUrl+`/formytek/public/api/UserProfile/${this.usernam[0].Username}`,{ headers: this.reqHeader })
                          .toPromise().then(

                (response) => {
                    console.log( response['profile']);
                    this.profile = response['profile'];
                })
      if(this.profile['add_user_profile']==1)
      {
      await this.http.get<any[]>(this.apiUrl+'/formytek/public/api/userProfileList', { headers: this.reqHeader })
         .toPromise().then(
           (res) => {
             res.forEach(element => {
               this.todo.push(element)
             });
           }).catch(
             (error) => {
             }
           );
            await this.http.get<any[]>(this.apiUrl+'/formytek/public/api/UserProfile', { headers: this.reqHeader })

         .toPromise().then(
           (res) => {
              this.allItems = res;
              console.dir(this.allItems);
             res.forEach(element => {
              this.count=this.count+1;
              console.log("ddd"+this.count)
              this.LIST_IDS.push('#id_' + this.count);
              this.done.push(element)

             });
           }).catch(
             (error) => {
             }
           );
          $('.rolldown-list li').each(function () {
            var delay = ($(this).index() / 4) + 's';
            $(this).css({
              webkitAnimationDelay: delay,
              mozAnimationDelay: delay,
              animationDelay: delay
            });
          });
}else{
               this.routers.navigate(['/pages/dashboard']) ;
}

 }

 sortable(){
   var self = this;

   $('#sortable1').sortable({connectWith: this.LIST_IDS,
start: function(e, ui) {

  // puts the old positions into array before sorting
    var old_position = ui.item.index();
      
},

update: function(event, ui) {
    // grabs the new positions now that we've finished sorting

    var new_position = ui.item.index();

     this.destId = ui.item.parent().attr("id");
     console.log("this"+this.destId)
    var item=ui.item;
        var iditem=ui.item.attr("id");

    this.Name=""
     this.Username= ""
     this.Name=$("#"+this.destId+" li:first-child").text()
     this.Username= ui.item.text();
                
  $('#'+this.destId+'> li .crois').css('display','initial');


 self.ProfileService.addUserToProfile(this.Username,this.Name).subscribe(
      data =>  {
           var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);  
    },
     error=>{

     var  newItem = '<li _ngcontent-c16  class="ui-state-default ng-star-inserted ui-sortable-handle" (click)="sortable($event)" style="padding:0.5em;margin: 0 5px 5px 5px;font-size: 1.2em;width: 180px;max-width: 180px; word-wrap: break-word;background-color: #DCDCDC;"><i class="nb-person"></i> <p style="width: 50%;position: absolute;">'+this.Username+'</p> <i class="ion-close-round" style="margin-left:70%;position: relative;width: 50px" (click)="deleteuser($event,item)"></i></li>'
      $("#sortable1").append(newItem)

        
        if(error['error'].text=='Success')
        {
                

          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);  
         
        }else{

                 $('#'+this.destId+' > li:contains('+this.Username+')').closest("li").remove();

           var x = document.getElementById("snackbar4");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);  
        }

    
})
 


 }

 
})
           $(".sortable2").sortable();   
}
deleteuser(event,item){
  console.log("hereee")
   this.windowService.open(
      this.disabledEscTemplate,
      {
        title: 'Delete user',
        hasBackdrop: false,
        closeOnEsc: true,
      },
    );
        $(".cdk-overlay-container").css('display','initial');

  

  this.classid =event.currentTarget.classList[0]
 this.Usernamed=item;
     this.Named=$("#"+this.classid+" li:first-child").text()
     
}
deleteUser(){
 console.dir("hh"+this.Usernamed);
  console.dir("hh"+this.Usernamed.Username);
if(this.Usernamed.Username){
  var user=this.Usernamed.Username
    console.dir("hh1"+user);

}else{
    console.dir("hh2"+user);

    var user=this.Usernamed

}
  console.dir("hh"+user);
   this.ProfileService.delteUserFromProfile(user).subscribe(
      data =>  {
    },
     error=>{

        
        if(error['error'].text=='Success')
        {
       $('#'+this.classid+'  li:contains('+this.Usernamed.Username+')').remove();
         console.dir("this.destId"+this.destId);
      $('li:contains('+this.Usernamed+')').remove();


          var x = document.getElementById("snackbar3");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);  
   //  var  newItem = '<li  _ngcontent-c16  class="ui-state-default ng-star-inserted ui-sortable-handle" (click)="sortable($event)" style="height: 40px;padding:0.5em;margin: 0 5px 5px 5px;font-size: 1.2em;width: 180px;max-width: 180px; word-wrap: break-word;background-color: #DCDCDC;" ><p style="width: 85%;position: absolute;"><i class="nb-person"></i>'+user+'</p> <i   class="ion-close-round crois" style="margin-left:70%;position: relative;width: 50px;display:none" (click)="deleteUser()"></i></li>'
    //  $("#sortable1").append(newItem)    

     var  newItem = `<li _ngcontent-c16  class="ui-state-default ng-star-inserted ui-sortable-handle" (click)="sortable($event)" style="padding:0.5em;margin: 0 5px 5px 5px;font-size: 1.2em;width: 180px;max-width: 180px; word-wrap: break-word;background-color: #DCDCDC;"><i class="nb-person"></i>`+user+`  <i   class="ion-close-round crois" style="margin-left:70%;position: relative;width: 50px;display:none" (click)="deleteuser(Event,user)"></i></li>`
      $("#sortable1").append(newItem)
     $("#sortable1").sortable(); 
      $(".sortable2").sortable();

  $( 'li .crois').css('display','none');

        }else{
           var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);  
        }

    
 })
    $(".cdk-overlay-container").css('display','none');

 
}
}
