import { Component, TemplateRef, ViewChild,ViewEncapsulation,OnInit     } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ScriptsPowerShellService } from '../../../@core/data/scripts-power-shell.service';
import { NbWindowService } from '@nebular/theme';
import { script } from '../../../@core/models/script.model';
import { ButtonRenderComponent } from './button.render.component';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';

import * as $ from 'jquery';

@Component({
  selector: 'scripts-power-shell',
  templateUrl: './scripts-power-shell.component.html',
  styles: [`
    :host /deep/ ng2-st-tbody-custom {
      padding-left: 10%!important;

   width: 50%!important;
  
    }
    :host /deep/ Button.btn-exec:hover{
      color:blue!important;
  
    }
 :host /deep/ ng2-st-tbody-custom a:nth-child(1) {
      width: 50%!important;

   position: absolute;
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
  :host /deep/ ng2-smart-table table tr.ng2-smart-titles th:nth-child(3) {
      width:10%!important;

  }

   :host /deep/ ng2-smart-table table tr.ng2-smart-titles td:nth-child(3) {
      width: 10%!important;
  }
    :host /deep/ .display {
      display:none;
      visibility: hidden;
    }
    :host /deep/ .width {
           width: 100%!important;
           border-right: none!important;
    }
  `],
})
export class ScriptsPowerShellComponent implements OnInit{
  /* Declaration */
    response: any=[];
    script_id: string;
    event_data:any;
    profile:any;
    reqHeader: any;
    apiUrl = environment.apiUrl;
    username:any;

 /* end of Declaration */

 /*smart table*/
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;
  settings = {
  delete: {
      deleteButtonContent: '<i class="ion-trash-a "></i>',
      confirmDelete: true
    },

   actions: {
        add: false,
        edit: false,

        custom: [{ name: 'ourCustomAction', title: '<i class="nb-compose " >' }],
        position: 'right'
    },
    columns: {
      id: {
        title: 'id',
        type: 'string',
        filter:false
      },
      Name: {
        title: 'Name',
        type: 'string',
      },
        button: {
        title: 'Execute script',
        type: 'custom',
        renderComponent: ButtonRenderComponent,

        filter:false
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
/*end of smart table*/
  constructor( private http: HttpClient,
               private router: Router,
               private ScriptService : ScriptsPowerShellService,
               private windowService: NbWindowService,
               private route: ActivatedRoute, 
               private LocalStorageService: LocalStorageService,
               private authservice: AuthService,) {

               this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this.authservice.authentication.token});

                 $(".cdk-overlay-container").css('display','none');

}

  onCustomAction(event) {
  this.router.navigate(['pages/scripts/update-script', {p1: event.data.id}]);
}

 
 onDeleteConfirm(event): void {
  this.windowService.open(
      this.disabledEscTemplate,
      {
        title: 'Delete user',
        hasBackdrop: false,
        closeOnEsc: true,
      },
    );
        $(".cdk-overlay-container").css('display','initial');

  this.script_id=event.data.id;
  this.event_data =event.data;
}

deleteScript(){
  //console.log("ssshhh"+this.script_id);
  this.ScriptService.deleteScript(this.script_id).subscribe();
  this.source.remove(this.event_data);
    $(".cdk-overlay-container").css('display','none');

 
}
   onExecuteConfirm(event): void {
   this.router.navigate(['pages/scripts/execute-scripts', {p1: event.data.id}]);
   //  console.log("t"+event.data.id);

  }
fade(){
     $(".cdk-overlay-container").css('display','none');


}
  async ngOnInit() {


       

      this.username = this.LocalStorageService.retriveUserAccount();
     await this.http.get(this.apiUrl+`/formytek/public/api/UserProfile/${this.username[0].Username}`,{ headers: this.reqHeader })
                          .toPromise().then(

                (response) => {
                    console.log( response['profile']);
                    this.profile = response['profile'];

                })

  await this.http.get<any[]>(this.apiUrl+'/formytek/public/api/ScriptShs', { headers: this.reqHeader })
         .toPromise().then(
       
         (response) => {
            this.response = response;

                 if(response[0].error!="Not allowed")

{
             this.source.load(this.response);
          
     


        if(this.profile['update_script']==1 && this.profile['delete_script']==null){
                   setTimeout(function(){

               $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
                $("ng2-st-tbody-custom").addClass('width');
                console.log("up1");});

          
        }else if(this.profile['update_script']==null) {
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
            });
       }
        if(this.profile['delete_script']==null && this.profile['update_script']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
               console.log("h1");
            });
       }
       if(this.profile['delete_script']==1 && this.profile['update_script']==1 ){
           
          setTimeout(function(){

            $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").removeClass('width');
                           });


        }
        else if(this.profile['delete_script']==1 && this.profile['update_script']==null){
             setTimeout(function(){
             $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("ng2-st-tbody-edit-delete").addClass('width');
              $("ng2-st-tbody-custom").css('border-right','none');
              $("ng2-st-tbody-edit-delete").css('margin-left','0%');

            console.log("heyy");
            });
             /* $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").addClass('width');*/

      }else if(this.profile['delete_script']==null ){
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-edit-delete").removeClass('width');
                               console.log("del1");

            });
      }else if(this.profile['delete_script']==null && this.profile['update_script']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
                              console.log("h1");

            });
       }
              

       if(this.profile['add_script']==1)
       {
          $(".add_script").css('display','initial');

       }
        else{
         $(".add_script").addClass('display');

        }

       if(this.profile['execute_script']==1)
       {
         $("table > tbody > tr >td:nth-child(3)").removeClass('display').addClass('ng-star-inserted');
         $("table > thead > tr >th:nth-child(3)").removeClass('display').addClass('ng-star-inserted');

       }
        else{
         $("table > tbody > tr >td:nth-child(3)").removeClass('ng-star-inserted').addClass('display');
          $("table > thead > tr >th:nth-child(3)").removeClass('ng-star-inserted').addClass('display');


        }

      var prof=this.profile;
    $(".ng2-smart-page-item").click(function(){
        if(prof['execute_script']==1)
       {
          $(".add_script").css('display','initial');

       }
        else{
         $(".add_script").addClass('display');

        }
      if(prof['update_script']==1 && prof['delete_script']==null){
                   setTimeout(function(){

               $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
                $("ng2-st-tbody-custom").addClass('width');
                console.log("up1");});

          
        }else if(prof['update_script']==null) {
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
            });
       }
        if(prof['delete_script']==null && prof['update_script']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
               console.log("h1");
            });
       }
       if(prof['delete_script']==1 && prof['update_script']==1 ){
           
          setTimeout(function(){

            $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").removeClass('width');
                           });


        }
        else if(prof['delete_script']==1 && prof['update_script']==null){
             setTimeout(function(){
             $("table > tbody > tr >td:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("table > thead > tr >th:last-child a.ng2-smart-action-custom-custom").removeClass('ng-star-inserted').addClass('display');
              $("ng2-st-tbody-edit-delete").addClass('width');
              $("ng2-st-tbody-custom").css('border-right','none');
              $("ng2-st-tbody-edit-delete").css('margin-left','0%');

            console.log("heyy");
            });
             /* $("table > tbody > tr >td:last-child ").removeClass('display').addClass('ng-star-inserted');
               $("table > thead > tr >th:last-child  ").removeClass('display').addClass('ng-star-inserted');
               $("ng2-st-tbody-edit-delete").addClass('width');*/

      }else if(prof['delete_script']==null ){
         setTimeout(function(){
                $("table > tbody > tr >td:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child a.ng2-smart-action-delete-delete").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-edit-delete").removeClass('width');
                               console.log("del1");

            });
      }else if(prof['delete_script']==null && prof['update_script']==null ){
            setTimeout(function(){
                $("table > tbody > tr >td:last-child").removeClass('ng-star-inserted').addClass('display');
                $("table > thead > tr >th:last-child").removeClass('ng-star-inserted').addClass('display');
               $(" ng2-st-tbody-custom").removeClass('width');
                              console.log("h1");

            });
       }
    });
    }else{
               this.router.navigate(['/pages/dashboard']) ;
}

        
     });

  }
}
