import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../models/user.model';
import { environment } from '../../../environments/environment';

import { map } from 'rxjs/operators';

export class userdeleted {
  username;
  homephone;
}
@Injectable()

export class UserService {
    apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }
/*  public getUsers()
  {  
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.get(this.apiUrl+'/formytek/public/api/userliste' ,{ headers: reqHeader });
  }*/
  public User(username)
  {      console.log("user.."+username);

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.get(this.apiUrl+`/formytek/public/api/User/${username}`).pipe(map((response: Response) => {return response}));
  }
  public activeUsers()
  {  
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.get(this.apiUrl+'/formytek/public/api/userliste1' ,{ headers: reqHeader });
  }
  public deleteUsers()
  {  
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.get(this.apiUrl+'/formytek/public/api/userliste2' ,{ headers: reqHeader });
  }
  public deleteUser(username)
  {  
    const body: userdeleted = {
      username:username,
  

      homephone:2
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(this.apiUrl+'/formytek/public/api/UpdateuserADPhoneNumber',body,{ headers: reqHeader }).pipe(map((response: Response) => {return response}));
  }
  public ReactiveUser(username)
  {      console.log("derf"+username)

    const body: userdeleted = {
      username:username,
      homephone:1
    }
    console.log("body")
    console.log(body)
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(this.apiUrl+'/formytek/public/api/UpdateuserADPhoneNumber',body,{ headers: reqHeader });
  }
   public addUser(user)
   {   
     console.log(JSON.stringify(user) )
     // {'username':user.username,'password':user.password,'lastname':user.lastname,'firstname':user.firstname,'company':user.company,'department':user.department,'jobTitle':user.jobTitle,'mail':user.mail,'officephone':user.officephone,'fax':user.fax,'cellphone':user.cellphone,'ddi':user.ddi,'homephone':user.homephone} 
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(this.apiUrl+'/formytek/public/api/AddusertoAD',JSON.stringify(user),{ headers: reqHeader });
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
    }
     
    console.log(JSON.stringify(body))
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(this.apiUrl+'/formytek/public/api/UpdateuserAD',JSON.stringify(body),{ headers: reqHeader });
   }
}


