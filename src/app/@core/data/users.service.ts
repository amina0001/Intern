import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../models/user.model';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../@core/data/auth.service';

import { map } from 'rxjs/operators';

export class userdeleted {
  username;
  homephone;
}
export class userGroup {
  UserName;
  GroupeName;
}
@Injectable()

export class UserService {
    apiUrl = environment.apiUrl;


  constructor(private http: HttpClient, private _auth_service: AuthService) { }
/*  public getUsers()
  {  
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.get(this.apiUrl+'/formytek/public/api/userliste' ,{ headers: reqHeader });
  }*/
  public User(username)
  {   //   console.log("user.."+username);

    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+`/formytek/public/api/User/${username}`, {headers: reqHeader});
  }
  public profileName()
  { 
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+`/formytek/public/api/ProfileName`, {headers: reqHeader});
  }
  public UserProfile(username)
  { 
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+`/formytek/public/api/UserProfile/${username}`, {headers: reqHeader});
  }
  public activeUsers()
  {  
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+'/formytek/public/api/userliste1', {headers: reqHeader});
  }
  public deleteUsers()
  {  
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+'/formytek/public/api/userliste2' ,{ headers: reqHeader });
  }
  public deleteUser(username)
  {  
    const body: userdeleted = {
      username:username,
  

      homephone:2
    }
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/UpdateuserADPhoneNumber',body,{ headers: reqHeader }).pipe(map((response: Response) => {return response}));
  }
  public ReactiveUser(username)
  {     // console.log("derf"+username)

    const body: userdeleted = {
      username:username,
      homephone:1
    }
 //   console.log("body")
 //   console.log(body)
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/UpdateuserADPhoneNumber',body,{ headers: reqHeader });
  }
   public addUser(user)
   {   
    console.log(JSON.stringify(user) )
     // {'username':user.username,'password':user.password,'lastname':user.lastname,'firstname':user.firstname,'company':user.company,'department':user.department,'jobTitle':user.jobTitle,'mail':user.mail,'officephone':user.officephone,'fax':user.fax,'cellphone':user.cellphone,'ddi':user.ddi,'homephone':user.homephone} 
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/AddusertoAD',user,{ headers: reqHeader });
   }
   public addUserToGroup(Username,Name)
   {     const body: userGroup = {
      UserName :Username,
      GroupeName:Name,
      
    }
    // console.log(JSON.stringify(userGroup) )
     // {'username':user.username,'password':user.password,'lastname':user.lastname,'firstname':user.firstname,'company':user.company,'department':user.department,'jobTitle':user.jobTitle,'mail':user.mail,'officephone':user.officephone,'fax':user.fax,'cellphone':user.cellphone,'ddi':user.ddi,'homephone':user.homephone} 
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/addusergroupe',body,{ headers: reqHeader });
   }
    public deleteUserFromGroup(Username,Name)
   {     const body: userGroup = {
      UserName :Username,
      GroupeName:Name,
      
    }
   //  console.log(JSON.stringify(userGroup) )
     // {'username':user.username,'password':user.password,'lastname':user.lastname,'firstname':user.firstname,'company':user.company,'department':user.department,'jobTitle':user.jobTitle,'mail':user.mail,'officephone':user.officephone,'fax':user.fax,'cellphone':user.cellphone,'ddi':user.ddi,'homephone':user.homephone} 
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/deleteusergroupe',body,{ headers: reqHeader });
   }
   public uptadeUser(user)
   {   
    const body: user = {
      username :user.username,
      lastname:user.lastname  != "" ? user.lastname : "0",
      firstname:user.firstname  != "" ? user.firstname : "0",
      department:user.department  != "" ? user.department : "0",
      company:user.company != "" ? user.company : "0",
      JobTitle:user.JobTitle != "" ? user.JobTitle : "0",
      password:"0",
      mail:user.mail != "" ? user.mail : "0",
      officephone :user.officephone != "" ? user.officephone : "0",
      cellphone :user.cellphone != "" ? user.cellphone : "0",
      homephone :user.homephone != "" ? user.homephone : "0",
      profile :user.profile != "" ? user.profile : "0",

    }
     
   // console.log(JSON.stringify(body))
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/UpdateuserAD',body,{ headers: reqHeader });
   }
}


