
import { Injectable } from '@angular/core';
import { processus } from '../models/processus.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProcessusService {

  constructor(private http: HttpClient ) {}

    addProcessus(processus ) {
      const body: processus = {
        Manager_agreement: processus.Manager_agreement,
        Manager_name:processus.ManagerName,
        Owner_agreement:processus.Owner_agreement,
        Owner_name:processus.Owner_name,
        IT_agreement:processus.IT_agreement,
        Processus_type:processus.Processus_type,
        Process:processus.Process,
        Script_upload:processus.Script,
        IT_owner:processus.IT_owner
      }  
      console.log(body);
      var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
      return this.http.post('http://192.168.100.31:8081/formytek/public/api/Processus', body,{headers : reqHeader});
   }

}
