
import { Component, TemplateRef,OnInit , ViewChild,ViewEncapsulation  } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService   } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

import {BreadcrumbsService} from "ng6-breadcrumbs";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GroupService } from '../../../@core/data/group.service';
import { UserService } from '../../../@core/data/users.service';
import { user } from '../../../@core/models/user.model';
 declare let $: any;
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';

 import { PagerService } from '../_services/index'
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';

@Component({
  selector: 'ngx-add-user-to-groups',
  templateUrl: './add-user-to-group.component.html',
     providers: [ UserService],

})

export class AddUserGroupsComponent implements OnInit{
 @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;
 todo:string[]; 
done:string[]; 
count:number; 
counter:number; 
Username:string=""; 
Name:string="";
Usernamed:string=""; 
Named:string="";  
// pager object
pager: any = {};
classid:string=""; 
// paged items
pagedItems: any[];
LIST_IDS:string[]; 
response:any;
usernam:any;
private allItems: any[];
apiUrl = environment.apiUrl;
reqHeader: any;
profile:any;
failed:any;
constructor(  private http: HttpClient,
               private routers: Router,
               private breadcrumbs:BreadcrumbsService,
               private windowService: NbWindowService,
               private route: ActivatedRoute, private LocalStorageService: LocalStorageService,private _auth_service: AuthService,private UserService :UserService,private ngxService: NgxUiLoaderService,private pagerService: PagerService
            ) {
    
    this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});

    }

async ngOnInit(){

this.todo=[];
this.done=[];
this.LIST_IDS=[];
this.count=0;
this.counter=0;
 this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 300);
       
       this.usernam = this.LocalStorageService.retriveUserAccount();
     await this.http.get(this.apiUrl+`/formytek/public/api/UserProfile/${this.usernam[0].Username}`,{ headers: this.reqHeader })
                          .toPromise().then(

                (response) => {
                
                      this.profile = response['profile'];

                  
         });

       if(this.profile){


     if(this.profile['add_user_group']==1 ){

      await this.http.get<any[]>(this.apiUrl+'/formytek/public/api/userliste1', { headers: this.reqHeader })
         .toPromise().then(
           (res) => {
             res.forEach(element => {
               this.todo.push(element.Username)
             });
           }).catch(
             (error) => {
             //  console.log(error);
             }
           );
            await this.http.get<any[]>(this.apiUrl+'/formytek/public/api/getAllGroupMember', { headers: this.reqHeader })

         .toPromise().then(
           (res) => {
              this.allItems = res;
             res.forEach(element => {
              this.count=this.count+1;
             // console.log("ddd"+this.count)
              this.LIST_IDS.push('#id_' + this.count);
   
               this.done.push(element)
                               //this.setPage(1);

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

           $(".sortable2").sortable();   
         }else{
                       this.routers.navigate(['/pages/dashboard']) ;

         }
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

    var destId = ui.item.parent().attr("id");
    this.Name=""
     this.Username= ""
     this.Name=$("#"+destId+" li:first-child").text()
     this.Username= ui.item.text();
                


 self.UserService.addUserToGroup(this.Username,this.Name).subscribe(
      data =>  {
    },
     error=>{

     var  newItem = '<li _ngcontent-c16  class=" click ui-state-default ng-star-inserted ui-sortable-handle" (click)="sortable($event)" style="padding:0.5em;margin: 0 5px 5px 5px;font-size: 1.2em;width: 180px;max-width: 180px; word-wrap: break-word;background-color: #DCDCDC;"><i class="nb-person"></i>'+this.Username+'</li>'
      $("#sortable1").append(newItem)

        
        if(error['error'].text=='Success')
        {
                

          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);  
         
        }else{

                 $('#'+destId+' > li:contains('+this.Username+')').closest("li").remove();

           var x = document.getElementById("snackbar4");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);  
        }

    
})
 


 }

 
})
 
}
deleteuser(event,item){
  //console.log(item.attr('id'))
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
 
   this.UserService.deleteUserFromGroup(this.Usernamed,this.Named).subscribe(
      data =>  {
    },
     error=>{

        
        if(error['error'].text=='Success')
        {
       $('#'+this.classid+' > li:contains('+this.Usernamed+')').remove();


          var x = document.getElementById("snackbar3");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);  
           $('<li _ngcontent-c36 class="click ui-state-default ng-star-inserted ui-sortable-handle" (click)="sortable($event)"><i class="nb-person"></i>'+this.Usernamed+'</li>').hide();
          
          $( ".click" ).click(function() {
            alert( "Handler for .click() called." );
          });

        }else{
           var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);  
        }

    
 })
    $(".cdk-overlay-container").css('display','none');

 
}
}
