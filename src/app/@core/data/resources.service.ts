import { Injectable } from '@angular/core';
import { resource } from '../models/resource.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserRelationResource } from '../models/UserRelationResource.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { AuthService } from '../../@core/data/auth.service';

@Injectable()
export class ResourceService {
  apiUrl = environment.apiUrl;

 public cart:Observable<string>
  constructor(private http: HttpClient, private _auth_service: AuthService) { }

    addResource(resource ) {
      const body: resource = {
      id:"",
      Type:resource.Type,
      Status:resource.Status,
      Categorize:resource.Categorize,
      Name:resource.Name,
      Description:resource.Description,
      Internal_information:resource.InternalInformation,
      Expiration_date :resource.ExpirationDate != null ? resource.ExpirationDate : null,
      Reference :resource.Reference != null ? resource.Reference : null,
      Serial_number :resource.SerialNumber  != null ? resource.SerialNumber : null,
      Comment :resource.Comment  != null ? resource.Comment : null,

      }  
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
      return this.http.post(this.apiUrl+'/formytek/public/api/Ressource', body,{headers : reqHeader});
   }

   getResource(id)
   {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
     return this.http.get(this.apiUrl+`/formytek/public/api/Ressource/${id}`, { headers: reqHeader });
   }
   getAllResources()
   {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
     return this.http.get(this.apiUrl+"/formytek/public/api/Ressources", { headers: reqHeader }).pipe(map((response: Response) => {return response}));
   }
   EditResource(resource) 
   {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/Ressourceupdate',resource ,{headers : reqHeader});
 
   }
   getEnabledResource()
   {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+"/formytek/public/api/EnabledRessources", { headers: reqHeader });
   }
   getUserResource()
   {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+"/formytek/public/api/userressources", { headers: reqHeader });
   }
   getUsernameResource(id)
   {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+"/formytek/public/api/Ressource/"+id, { headers: reqHeader }) 
   }
   AddUserRessources(resource,username)
   {
    const userResource: UserRelationResource = {
      IdResource:resource,
      UserName:username,
      NameResource:"",
      Id:""
    }
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+'/formytek/public/api/Adduserressources', userResource,{headers : reqHeader});
   }
   DeleteUserRessources(id)
   {
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.get(this.apiUrl+"/formytek/public/api/userressourcesDelete/"+id, { headers: reqHeader }) 
   }
    DemandAccess( res_id)
   {  

     const  body_id = {
      id:res_id,
     

      } 
    var reqHeader = new HttpHeaders({"Authorization": "Bearer " + this._auth_service.authentication.token});
    return this.http.post(this.apiUrl+"/formytek/public/api/ressource-to-validate",body_id, { headers: reqHeader }) 
   }
}

  