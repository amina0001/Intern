import { Component, TemplateRef, ViewChild, OnInit   } from '@angular/core';
declare var jquery:any;
declare var $ :any;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';

import { ResourceService } from '../../../@core/data/resources.service';
import { resource } from '../../../@core/models/resource.model';
import { Router, ActivatedRoute } from '@angular/router';

import { NbWindowService } from '@nebular/theme';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';

import {ImageRenderComponent} from './image-render.render.component';
@Component({
  selector: 'active_resource',
  templateUrl: './active-resources.component.html',
  styleUrls: ['./active-resources.component.css'],
  styles: [`
   :host /deep/ ng2-st-tbody-custom {
     width: 50%;
   
    }
    :host /deep/ table th:nth-child(1){
    display:none!important;

    }
    :host /deep/ table td:nth-child(1){
    display:none!important;

    }
  
     
    :host /deep/ .display {
      display:none;
    }
    .Event{
      height: 15px;
      width: 15px;
      background-color: red;
      border-radius: 50%;
    }
  `],
  providers: [ ResourceService ]

})
export class ActiveResourcesComponent implements OnInit{

  response: any=[];
  event_id: any;
  profile:any;
  reqHeader: any;
  apiUrl = environment.apiUrl;
  username:any;
  settings = {
   
       delete: {
      deleteButtonContent: '<i class="nb-locked"></i>',
      confirmDelete: true
    },

   actions: {
  add: false,
  edit: false,

  custom: [{ name: 'ourCustomAction', title: '<div><i class="nb-compose" >' },],
  position: 'right'
},
    columns: {
   
      id: {
        title: 'id',
     
        show:false,
      },
      button: {
        title: 'State',
        filter: false,
      
      },
      Categorize: {
        title: 'Categorize',

      },
      Status: {
        title: 'status',
        type: 'string',
      },
      Type: {
        title: 'type',
        type: 'string',
      },
      Name  : {
        title: 'Name',
        type: 'string',
      },
      Description: {
        title: 'Description',
        type: 'string',
      },
      Internal_information: {
        title: 'Internal informmation',
        type: 'string',
      },
      
     
     
    },
  };
   source: LocalDataSource = new LocalDataSource();

constructor( private http: HttpClient,
               private routers: Router,
               private ResourceService : ResourceService,
               private windowService: NbWindowService,
               private route: ActivatedRoute,
               private LocalStorageService: LocalStorageService,
               private _auth_service: AuthService,) {
             
             this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});


  
    }

 async ngOnInit() {

var i=0;
var j=0;     
   this.username = this.LocalStorageService.retriveUserAccount();
    

      if(this.username.Login !="Administrator"){

      this.http.get(this.apiUrl+`/formytek/public/api/UserProfile/${this.username[0].Username}`,{ headers: this.reqHeader })
                          .toPromise().then(

                (response) => {
                    this.profile = response['profile'];
         })
         this.http.get<any[]>(this.apiUrl+'/formytek/public/api/Ressources', { headers: this.reqHeader })
        .toPromise().then(
       
         (response) => {
            this.response = response;
                this.http.get<any[]>(this.apiUrl+'/formytek/public/api/authActiveAccess', { headers: this.reqHeader })
         .toPromise().then( (response) => {
            
          
                 setTimeout(function(){  


                   $("table > tbody >  tr").each(function () {
                    
                        j=$(this).find("td:first-child").text()
                        console.log("j",j)
                      $(this).find("td:nth-child(2)").append('<div id="dot_'+j+'"  style="height: 15px;width: 15px;background-color: red;border-radius: 50%;"></div>'); 
                          });

                       
                  })





            response.forEach(element => {
              
                    var ids ="#dot_"+element['ressource_id']+""
              if(element['to_validate']==1){
          
         setTimeout(function(){ $(ids).css("background-color", "yellow")} );
       }
            if(element['active_access']==1){
            setTimeout(function(){$(ids).css("background-color", "green")}
             );
           }

             });
           
         })
                 if(response[0].error!="Not allowed")

              {
       
             this.source.load(this.response);

            
        if(this.profile['update_ressource']==1 ){
                   setTimeout(function(){

               $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
                $("table > thead > tr ").removeClass('display').addClass('ng-star-inserted');

              });

          
        }else if(this.profile['update_ressource']==null) {
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child ").removeClass('ng-star-inserted').addClass('display');
                $("table > tbody > tr > td:last-child ").removeClass('ng-star-inserted').addClass('display');

            });
       }
       }else{
                 this.routers.navigate(['/pages/dashboard']) ;

}
   
      
         });

       if(this.profile['add_ressource']==1)
       {
          $(".add_ressource").css('display','initial');

       }
        else{
         $(".add_ressource").addClass('display');

        }
        
   
   
    var prof=this.profile;
    $(".ng2-smart-page-item").click(function(){

        if(prof['update_ressource']==1 ){
                   setTimeout(function(){

               $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
                $("table > thead > tr ").removeClass('display').addClass('ng-star-inserted');


          });
        }else if(prof['update_ressource']==null) {
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child ").removeClass('ng-star-inserted').addClass('display');
                $("table > tbody > tr > td:last-child ").removeClass('ng-star-inserted').addClass('display');

            });
       }
       if(prof['add_ressource']==1)
       {
          $(".add_ressource").css('display','initial');

       }
        else{
         $(".add_ressource").addClass('display');

        }
    });
  }  else if(this.username.Login =="Administrator"){
       this.http.get<any[]>(this.apiUrl+'/formytek/public/api/Ressources', { headers: this.reqHeader })
         .subscribe(
       
         (response) => {
            this.response = response;
            this.source.load(this.response);});
  }


  }

onCustomAction(event) {
            this.routers.navigate(['/pages/resources/update', {p1: event.data.id}]) ;
           // console.log(event.data.Username);

}

 onDeleteConfirm(event): void {
  $("#Modal").modal('show');

  this.event_id = event.data.id;
}
demandAccess(id){
console.log("id here"+id);
this.ResourceService.DemandAccess(id).subscribe(
  data=>{
             var x = document.getElementById("snackbar");
              x.className = "show";
             setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
  });
}

}
