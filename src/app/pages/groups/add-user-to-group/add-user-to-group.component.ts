
import { Component, TemplateRef, ViewChild,OnInit   } from '@angular/core';
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
@Component({
  selector: 'ngx-add-user-to-groups',
  templateUrl: './add-user-to-group.component.html',
     providers: [ UserService],

})

export class AddUserGroupsComponent implements OnInit{

 todo:string[]; 
  done:string[]; 
  count:number; 
    counter:number; 
    Username:string=""; 
    Name:string=""; 

LIST_IDS:string[]; 
response:any;
constructor(  private http: HttpClient,
               private routers: Router,
               private breadcrumbs:BreadcrumbsService,
               private windowService: NbWindowService,
               private route: ActivatedRoute,private UserService :UserService,private ngxService: NgxUiLoaderService
            ) {
    
  
    }
async ngOnInit(){

this.todo=[];
this.done=[];
this.LIST_IDS=[];
this.count=0;
this.counter=0;

      await this.http.get<any[]>('http://41.230.17.28:8081/formytek/public/api/userliste1')
         .toPromise().then(
           (res) => {
             res.forEach(element => {
               this.todo.push(element.Username)
             });
           }).catch(
             (error) => {
               console.log(error);
             }
           );
            await this.http.get<any[]>('http://41.230.17.28:8081/formytek/public/api/getAllGroupMember')
         .toPromise().then(
           (res) => {
             res.forEach(element => {
              this.count=this.count+1;
              console.log("ddd"+this.count)

                                this.LIST_IDS.push('#id_' + this.count);

               this.done.push(element)

             });
           }).catch(
             (error) => {
               console.log(error);
             }
           );
console.log(this.LIST_IDS)


 }

 sortable(){
   var self = this;

console.log("ffff")
   $('#sortable1').sortable({connectWith: this.LIST_IDS,start: function(e, ui) {
    

  // puts the old positions into array before sorting
    var old_position = ui.item.index();
    console.log(old_position)
},
update: function(event, ui) {
    // grabs the new positions now that we've finished sorting
    var new_position = ui.item.index();

    var destId = ui.item.parent().attr("id");
     this.Name=$("#"+destId+" li:first-child").text()
     this.Username= ui.item.text();

    console.log( destId);
        console.log( this.Username);
 self.UserService.addUserToGroup(this.Username,this.Name).subscribe(
      data =>  {
    },
     error=>{
         console.log(error['error'].text)
         
         self.ngxService.start(); 
          setTimeout(() => {
            self.ngxService.stop(); 
          }, 700);
       
          // OR
          self.ngxService.startBackground('do-background-things');
          // Do something here...
          self.ngxService.stopBackground('do-background-things');
       
          self.ngxService.startLoader('loader-01'); 
          setTimeout(() => {
            self.ngxService.stopLoader('loader-01');
          }, 700);
        if(error['error'].text=='Success')
        {
                

          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);  
          console.log(error['error'].text)
         
        }else if(error['error'].text=='UserName already exists')
        { 
          console.log(error['error'].text)
         

        }else{
           var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 9000);  
          console.log(error['error'].text)
        }
    
})


 		
     //  $("#id_3").sortable();   
 }

 
})
           $(".sortable2").sortable();   
}

}