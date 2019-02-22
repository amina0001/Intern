import { Component} from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';
import { processus } from '../../../@core/models/processus.model';
import { ProcessusService } from '../../../@core/data/processus.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

import * as $ from 'jquery';


@Component({
  selector: 'ng-add-action-resources',
  templateUrl: './add-action-resources.component.html',
  styleUrls: ['./add-action-resources.component.css','./add-action-resources.component.scss'],
       providers: [ ProcessusService]

})
export class AddActionResourcesComponent{
	model:processus = new processus();
  constructor(private ProcessusService: ProcessusService, private http: HttpClient,
               private routers: Router,
              
               private windowService: NbWindowService,
               private route: ActivatedRoute,private ngxService: NgxUiLoaderService) {
   
   }
	addProcessus(processus)
  {console.log(this.model)
   // console.log($('#Manadatory_Manager').button('toggle')[0])
   if ($('#Manadatory_Manager').prop("checked")== false && $('#Optional_Manager').prop("checked")== false )
   {
    this.model.Manager_agreement ="Manadatory"
   }else 
   {
    if ($('#Manadatory_Manager').prop("checked")== true)
    {
      this.model.Manager_agreement ="Manadatory"

    }else if ($('#Optional_Manager').prop("checked")== true)
    {
      this.model.Manager_agreement ="Optional"
    }
  }
  if ($('#Manadatory_Owner').prop("checked")== false && $('#Optional_Owner').prop("checked")== false )
  {
    this.model.Owner_agreement ="Manadatory"
  } else
  {
    if ($('#Optional_Owner').prop("checked")== true)
    {
      this.model.Owner_agreement ="Manadatory"
    }else 
    {
      this.model.Owner_agreement ="Optional"
    }
  }
  if ($('#Manadatory_IT').prop("checked")== false && $('#Optional_IT').prop("checked")== false )
  {
    this.model.IT_agreement ="Manadatory"
  }else{
    if ($('#Manadatory_IT').prop("checked")== true)
    {
      this.model.IT_agreement ="Manadatory"
    }else 
    {
      this.model.IT_agreement ="Optional"
    }
  }
  if ($('#_script').prop("checked")== false && $('#_process').prop("checked")== false )
  {
    this.model.Processus_type ="By script"
  }else{
    if ($('#_script').prop("checked")== true)
    {
     this.model.Processus_type ="By script"
    }else 
    {
      this.model.Processus_type ="By process"
    }
  }


    this.ProcessusService.addProcessus(this.model).subscribe(data => {
    	 this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 300);
          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
    }),
(error)=>
{  this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 300);
           var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
  console.log(error);
};
  }
  back()
  {
  this.routers.navigate(['/pages/resources/add-active-resources']) 
  }
}