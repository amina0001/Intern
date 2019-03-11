
import { Injectable } from '@angular/core';
import { processus } from '../models/processus.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../@core/data/auth.service';

@Injectable()
export class ProcessusService {
    apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private _auth_service: AuthService ) {}

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
    
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
      return this.http.post(this.apiUrl+'/formytek/public/api/Processus', body,{headers : reqHeader});
   }

}
