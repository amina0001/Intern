import { Component, OnInit  } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { LocalStorageService } from '../../app/@core/data/local-storage.service';
import * as $ from 'jquery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../@core/data/auth.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
   styles: [`

    :host /deep/ ng2-st-tbody-custom {
     width: 50%;
   
    }

    :host /deep/ .display {
      display:none;
      visibility: hidden;
    }
    :host /deep/ .width {
           width: 100%!important;
           border-right: none!important;
    }
   
  `],
     providers: [ LocalStorageService]

})
//<ngx-ui-loader></ngx-ui-loader>
export class PagesComponent implements OnInit {
   apiUrl = environment.apiUrl;
   private username: any;

  private _baseUrl = this.apiUrl+"/formytek/public/api";
  menu = MENU_ITEMS;
  profile:any;
  failed:any;
  reqHeader: any;
  name:string="";
  constructor(private _http: HttpClient, private LocalStorageService: LocalStorageService, private _auth_service: AuthService) {
    
       this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});

  }
   async ngOnInit(){


    this.username = this.LocalStorageService.retriveUserAccount();

    this.name=this.username["Login"];   
    if(this.name!="Administrator"){
    await   this._http.get(this.apiUrl+`/formytek/public/api/UserProfile/${this.username[0].Username}`,{ headers: this.reqHeader })
                          .toPromise().then(

                (response) => {
             
                      this.profile = response['profile'];
               
                    if(this.profile ){
                
   if(this.profile['consult_user']==null && this.profile['consult_deleted_user']==null){
        setTimeout(function(){

       $(".menu-items li:nth-child(4)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted').addClass('menu-item ng-tns-c9-7 ng-star-inserted display');
           
    });
    }
    else {
     setTimeout(function(){

       $(".menu-items li:nth-child(4)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted display').addClass('menu-item ng-tns-c9-7 ng-star-inserted ');
           

    });

        }
                  
     if(this.profile['consult_group']==null && this.profile['add_user_group']==null ){
        setTimeout(function(){

       $(".menu-items li:nth-child(5)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted').addClass('menu-item ng-tns-c9-7 ng-star-inserted display');
           

    });
    }
    else {
     setTimeout(function(){

       $(".menu-items li:nth-child(5)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted display').addClass('menu-item ng-tns-c9-7 ng-star-inserted ');
           

    });

    }

      if(this.profile['consult_group']==null){
        setTimeout(function(){

       $(".menu-items li:nth-child(5) ul li:nth-child(1)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted').addClass('menu-item ng-tns-c9-7 ng-star-inserted display');
           

    });
    }
    else {
     setTimeout(function(){

       $(".menu-items li:nth-child(5) ul li:nth-child(1)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted display').addClass('menu-item ng-tns-c9-7 ng-star-inserted ');
           

    });

    }
      if(this.profile['add_user_group']==null){
        setTimeout(function(){

       $(".menu-items li:nth-child(5) ul li:nth-child(2)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted').addClass('menu-item ng-tns-c9-7 ng-star-inserted display');
           

    });
    }
    else {
     setTimeout(function(){

       $(".menu-items li:nth-child(5) ul li:nth-child(2)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted display').addClass('menu-item ng-tns-c9-7 ng-star-inserted ');
           

    });

    }

      if(this.profile['add_user_profile']==null){
        setTimeout(function(){

       $(".menu-items li:nth-child(9) ul li:nth-child(2)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted').addClass('menu-item ng-tns-c9-7 ng-star-inserted display');
           

    });
    }
    else {
     setTimeout(function(){

       $(".menu-items li:nth-child(9) ul li:nth-child(2)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted display').addClass('menu-item ng-tns-c9-7 ng-star-inserted ');
           

    });

    }
      if(this.profile['consult_profile']==null){
        setTimeout(function(){

       $(".menu-items li:nth-child(9) ul li:nth-child(1)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted').addClass('menu-item ng-tns-c9-7 ng-star-inserted display');
           

    });
    }
    else {
     setTimeout(function(){

       $(".menu-items li:nth-child(9) ul li:nth-child(1)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted display').addClass('menu-item ng-tns-c9-7 ng-star-inserted ');
           

    });

    }
      if(this.profile['consult_profile']==null && this.profile['add_user_profile']==null){
        setTimeout(function(){

       $(".menu-items li:nth-child(9)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted').addClass('menu-item ng-tns-c9-7 ng-star-inserted display');
           

    });
    }
    else {
     setTimeout(function(){

       $(".menu-items li:nth-child(9)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted display').addClass('menu-item ng-tns-c9-7 ng-star-inserted ');
           

    });

    }
    if(this.profile['consult_ressource']==null){
        setTimeout(function(){

       $(".menu-items li:nth-child(6)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted').addClass('menu-item ng-tns-c9-7 ng-star-inserted display');
           

    });
    }
    else {
     setTimeout(function(){

       $(".menu-items li:nth-child(6)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted display').addClass('menu-item ng-tns-c9-7 ng-star-inserted ');
           

    });

    }
     if(this.profile['consult_script']==null){
        setTimeout(function(){

       $(".menu-items li:nth-child(8)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted').addClass('menu-item ng-tns-c9-7 ng-star-inserted display');
           

    });
    }
    else {
     setTimeout(function(){

       $(".menu-items li:nth-child(8)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted display').addClass('menu-item ng-tns-c9-7 ng-star-inserted ');
           

    });

    }
    if(this.profile['consult_deleted_user']==null){
        setTimeout(function(){

       $(".menu-items li:nth-child(4) ul li:nth-child(2)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted').addClass('menu-item ng-tns-c9-7 ng-star-inserted display');
           

    });
    }
    else {
     setTimeout(function(){

       $(".menu-items li:nth-child(4) ul li:nth-child(2)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted display').addClass('menu-item ng-tns-c9-7 ng-star-inserted ');
           

    });

    }
if(this.profile['consult_user']==null){
        setTimeout(function(){

       $(".menu-items li:nth-child(4) ul li:nth-child(1)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted').addClass('menu-item ng-tns-c9-7 ng-star-inserted display');
           

    });
    }
    else {
     setTimeout(function(){

       $(".menu-items li:nth-child(4) ul li:nth-child(1)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted display').addClass('menu-item ng-tns-c9-7 ng-star-inserted ');
           

    });

    }
    if(this.username[0].Username!="Administrator"){

        setTimeout(function(){

       $(".menu-items li:nth-child(10)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted').addClass('menu-item ng-tns-c9-7 ng-star-inserted display');
           

    });
    }
    else {
     setTimeout(function(){

       $(".menu-items li:nth-child(10)").removeClass('menu-item ng-tns-c9-7 ng-star-inserted display').addClass('menu-item ng-tns-c9-7 ng-star-inserted ');
           

    });

    }
  }
    
                    
                })
                .catch(
                (error) => {});
              }
 
    
 
  }
  
}
