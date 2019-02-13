import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, } from '@angular/common/http';
import { script } from './models/script.model';
import { resolve } from 'url';
import { Observer,Observable } from 'rxjs';
@Injectable()
export class ScriptsPowerShellService {

  constructor(private http: HttpClient) { }
  getAllScripts()
  {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.get("http://192.168.100.31:8081/formytek/public/api/ScriptShs", { headers: reqHeader });
  }
  addScript(script)
  {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post('http://192.168.100.31:8081/formytek/public/api/ScriptSh', script ,{headers : reqHeader});
  }
  editScript(script)
  {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://192.168.100.31:8081/formytek/public/api/ScriptShUpdate',script ,{headers : reqHeader});
  }
  deleteScript(id)
  {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get("http://192.168.100.31:8081/formytek/public/api/ScriptShDelete/"+id, { headers: reqHeader });
  }
  getById(id)
  {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.get("http://192.168.100.31:8081/formytek/public/api/ScriptSh/"+id, { headers: reqHeader });
  }
  executeScript(cmd)
  {
    console.log(cmd)
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post('http://192.168.100.31:8081/formytek/public/api/PowerShell', {"cmd":cmd} ,{headers : reqHeader})
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
}                                             
