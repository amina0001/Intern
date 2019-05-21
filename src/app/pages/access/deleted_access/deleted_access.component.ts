
import { Component, TemplateRef, ViewChild,OnInit   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbWindowService   } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessService } from '../../../@core/data/access.service';
import { user } from '../../../@core/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './deleted_access.component.html',
 styleUrls: ['./deleted_access.component.css'],
  styles: [`

    :host /deep/ ng2-st-tbody-custom {
     width: 50%;
   
    }

    :host /deep/ .display {
      display:none;
      visibility: hidden;
    }
    :host /deep/ .width {
           width: 100%!important;
           border-right: none!important;
    }
    
  :host /deep/ ng2-smart-table table tr.ng2-smart-titles th:nth-child(1) {
      display:none!important;

  }
  :host /deep/ ng2-smart-table table tr td:nth-child(1) {
      display:none!important;

  }
   :host /deep/  ng2-smart-table thead tr.ng2-smart-filters th:nth-child(1) {
           display:none!important;

}
  `],
     providers: [ AccessService]

})

export class deletedAccessComponent implements OnInit {

  /******** Declarations variables ********/
  response: any=[];
  event_id: string;
  event_data:any;
  profile:any;
  reqHeader: any;
  apiUrl = environment.apiUrl;
  username:any;
  /******** End of Declarations variables ********/

   /******** Smart Table configuration ********/



  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;

  settings = {

    
        actions: {
            add: false,
            edit: false,
            delete:false,
            },
        columns: {
            id: {
                title: 'id',
                type: 'string',
              },
              username: {
                title: 'Username',
                type: 'string',
              },
              ressource_id: {
                title: 'Ressource Name',
                type: 'string',
              },
           
           },

  };

    source: LocalDataSource = new LocalDataSource();

      /******** End Of Smart Table configuration ********/

      constructor(  private http: HttpClient,
                     private routers: Router,
                     private AccessService : AccessService,
                     private windowService: NbWindowService,
                     private route: ActivatedRoute,
                     private LocalStorageService: LocalStorageService,
                     private authservice: AuthService,

                  ) {
                          this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this.authservice.authentication.token});
                        }



 async ngOnInit() {
this.http.get<any[]>(this.apiUrl+'/formytek/public/api/deleted-access', { headers: this.reqHeader })
         .subscribe(
       
         (response) => {
            this.response = response;
            this.source.load(this.response);

          })
}

}