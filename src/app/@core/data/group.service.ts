import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../@core/data/auth.service';

import { map } from 'rxjs/operators';


@Injectable()

export class GroupService {
    apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private _auth_service: AuthService) { }


  public Group()
  {    

    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+"/formytek/public/api/getAllGroup",{ headers: reqHeader }).pipe(map((response: Response) => {return response}));;
  }

  public AddGroup(group)
  {    
  //   console.log(JSON.stringify(group));

    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+"/formytek/public/api/AddgroupeAD",group,{ headers: reqHeader });
  }
  
   public UpdateGroup(group)
  {    
  //   console.log(JSON.stringify(group));

    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+"/formytek/public/api/groupeUpdate",group,{ headers: reqHeader });
  }
  public getGroup(name)
  {   //      console.log(name);


    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+`/formytek/public/api/getGroup/${name}`,{ headers: reqHeader }).pipe(map((response: Response) => {return response}));;
  }
    public deleteGroup(name)
  {      


    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+'/formytek/public/api/deleteGroup/'+name, { headers: reqHeader });
    }
}


