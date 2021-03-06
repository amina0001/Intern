import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, } from '@angular/common/http';
import { script } from '../models/script.model';
import { resolve } from 'url';
import { Observer,Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../@core/data/auth.service';

@Injectable()
export class ScriptsPowerShellService {

  constructor(private http: HttpClient, private _auth_service: AuthService) { }
      apiUrl = environment.apiUrl;

  getAllScripts()
  {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+'/formytek/public/api/ScriptShs', { headers: reqHeader });
  }
  addScript(script)
  {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/ScriptSh', script ,{headers : reqHeader});
  }
  editScript(script)
  {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/ScriptShUpdate',script ,{headers : reqHeader});
  }
  deleteScript(id)
  {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+'/formytek/public/api/ScriptShDelete/'+id, { headers: reqHeader });
  }
  getById(id)
  {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+'/formytek/public/api/ScriptSh/'+id, { headers: reqHeader });
  }
  executeScript(cmd)
  { console.log(cmd);
   
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/PowerShell', {"cmd":cmd} ,{headers : reqHeader})
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
}                                             
