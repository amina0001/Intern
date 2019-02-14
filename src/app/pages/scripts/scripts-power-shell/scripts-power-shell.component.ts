import { Component, TemplateRef, ViewChild,ViewEncapsulation,OnInit     } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ScriptsPowerShellService } from '../../../@core/data/scripts-power-shell.service';
import { NbWindowService } from '@nebular/theme';
import { script } from '../../../@core/models/script.model';
import { ButtonRenderComponent } from './button.render.component';
import * as $ from 'jquery';

@Component({
  selector: 'scripts-power-shell',
  templateUrl: './scripts-power-shell.component.html',
  styles: [`
    :host /deep/ ng2-st-tbody-custom {
  
   width: 50%!important;
  
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
  `],
})
export class ScriptsPowerShellComponent implements OnInit{
    response: any=[];
    script_id: string;
    event_data:any;
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

  constructor( private http: HttpClient,
               private router: Router,
               private ScriptService : ScriptsPowerShellService,
               private windowService: NbWindowService,
               private route: ActivatedRoute,) {
   
       
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
  console.log("ssshhh"+this.script_id);
  this.ScriptService.deleteScript(this.script_id).subscribe();
  this.source.remove(this.event_data);
    $(".cdk-overlay-container").css('display','none');

 
}
   onExecuteConfirm(event): void {
   this.router.navigate(['pages/scripts/execute-scripts', {p1: event.data.id}]);
     console.log("t"+event.data.id);

  }

  ngOnInit() {
     this.response =  this.ScriptService.getAllScripts().subscribe(result => {
                           this.response = result;
                           console.log("onInit");
                            this.source.load(this.response);
                         });
 
  }
}
