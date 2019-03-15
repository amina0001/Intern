import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, } from '@angular/common/http';
import { profile } from '../models/profile.model';
import { resolve } from 'url';
import { Observer,Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../@core/data/auth.service';
import { map } from 'rxjs/operators';

export class userProfile {
  Username;
  profile_id;
}
@Injectable()
export class ProfileService {

  constructor(private http: HttpClient, private _auth_service: AuthService) { }
      apiUrl = environment.apiUrl;


  addProfile(profile)
  {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/add_Profile', profile ,{headers : reqHeader});
  }
   addUserToProfile(Username,profile_id)
   {     const body: userProfile = {
      Username :Username,
      profile_id:profile_id,
      
    }
  console.log(body)
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/adduserprofile', body ,{headers : reqHeader});
  }

   delteUserFromProfile(Username)
   {   
    
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+`/formytek/public/api/deleteuserprofile/${Username}` ,{headers : reqHeader});
  }
    Profile()
  {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+'/formytek/public/api/Profile' ,{headers : reqHeader});
  }  
     GetProfile(id)
  {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+`/formytek/public/api/GetProfil/${id}`,{headers : reqHeader});
  }
   updateProfile(profile)
  { console.log(profile)
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/UpdateProfil',profile,{headers : reqHeader});
  }     
     deletePo(id)
  {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+`/formytek/public/api/deleteProfil/${id}`,{headers : reqHeader}).pipe(map((response: Response) => {return response}));;
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
}                                             
