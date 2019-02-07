import { Injectable } from '@angular/core';
import { configuration_others } from '../models/configuration_others.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { login } from '../models/login.model';

import { environment } from '../../../environments/environment';

@Injectable()
export class SettingService {
apiUrl = environment.apiUrl;

  constructor(private http: HttpClient ) { }
  addSetting(setting ) {
    console.log("setting")
    console.log(setting)
    // const body: configuration_others = {
 
    // // Server_name:setting.Server_name,
    // // Port:setting.Port,
    // // User_account:setting.User_account,
    // // Password:setting.Password,
    // // Passwordad:setting.Passwordad,
    // // Forest_name:setting.Forest_name,
    // // Service_account:setting.Service_account,
    // // Domaine:setting.Domaine,
    // // mail:setting.mail
 
    // }  
    //console.log(body)
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(this.apiUrl +'/formytek/public/api/ConfigurationOther', setting,{headers : reqHeader});
 }
 addSmtp(smtp)
 {
  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
  return this.http.post(this.apiUrl +'/formytek/public/api/smtp', smtp,{headers : reqHeader});
 }

 verifyAdminDirectory(adminDirectory) 
 {
   console.log(adminDirectory)
   
  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
 
   return this.http.post(this.apiUrl +'/formytek/public/api/verifyAD', JSON.stringify(adminDirectory) ,{headers : reqHeader})      
 }

 getUser( ) {
  const model: login = {

 Login:"hyth",
 Password:"hh",
 

  }  
 
  return model
}

}
