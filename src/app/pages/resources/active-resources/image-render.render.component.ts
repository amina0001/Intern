
import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';

import { ResourceService } from '../../../@core/data/resources.service';
import { resource } from '../../../@core/models/resource.model';
import { Router, ActivatedRoute } from '@angular/router';

import { NbWindowService } from '@nebular/theme';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';
declare var $ : any;

@Component({
  template: `
   <div id="dot_{{this.j+1}}" style="height: 15px;width: 15px;background-color: red;border-radius: 50%;" let j=j+1; ></div>

  `,
})
export class ImageRenderComponent implements OnInit {

  public renderValue;
  username:any;
  response: any=[];
  event_id: any;
  profile:any;
  reqHeader: any;
  apiUrl = environment.apiUrl;
  j:any=0;
  @Input() value;

  constructor( private LocalStorageService: LocalStorageService,private http: HttpClient,
               private routers: Router,
               private ResourceService : ResourceService,
               private windowService: NbWindowService,
               private route: ActivatedRoute,
               private authservice: AuthService,) { 
                this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this.authservice.authentication.token});
                /*	   this.username = this.LocalStorageService.retriveUserAccount();

    
    var i=0;
          
   this.http.get<any[]>(this.apiUrl+'/formytek/public/api/authActiveAccess', { headers: this.reqHeader })
         .toPromise().then( (response) => {
            response.forEach(element => {
              i=i+1;
              this.j=this.j+1;
              console.log("j"+this.j)
              if(element['to_validate']==1){
              	var ids ="#dot_"+i+""
         setTimeout(function(){ $(ids).css("background-color", "yellow")} );
            if(element['active_access']==1){
            setTimeout(function(){$("#dot_"+i).css("background-color", "green")}
             );
           }

             });
           
         })*/
 }

  async ngOnInit() {
  

    this.renderValue = this.value;
    }
  


}