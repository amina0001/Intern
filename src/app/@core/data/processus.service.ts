
import { Injectable } from '@angular/core';
import { processus } from '../models/processus.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProcessusService {

  constructor(private http: HttpClient ) {}
    apiUrl = environment.apiUrl;

    addProcessus(processus ) {
      const body: processus = {
        Manager_agreement: processus.Manager_agreement,
        Manager_name:processus.ManagerName,
        Owner_agreement:processus.Owner_agreement,
        Owner_name:processus.OwnerName,
        IT_agreement:processus.IT_agreement,
        Processus_type:processus.Processus_type,
        Process:processus.Process,
        Script_upload:processus.Script,
        IT_owner:processus.ITOwner
      }  
      var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
      return this.http.post(this.apiUrl+'/formytek/public/api/Processus', body,{headers : reqHeader});
   }

}
