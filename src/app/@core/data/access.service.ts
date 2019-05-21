import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../@core/data/auth.service';

import { map } from 'rxjs/operators';


@Injectable()

export class AccessService {
    apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private _auth_service: AuthService) { }


  public to_validate()
  {    

    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+"/formytek/public/api/to-validate",{ headers: reqHeader }).pipe(map((response: Response) => {return response}));;
  }

   public refuseAccess(id)
  {    

    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+"/formytek/public/api/deleteAccess/"+id,{ headers: reqHeader }).pipe(map((response: Response) => {return response}));;
  }
   public acceptAccess(id)
  {    

    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+"/formytek/public/api/activeAccess/"+id,{ headers: reqHeader }).pipe(map((response: Response) => {return response}));;
  }

}


