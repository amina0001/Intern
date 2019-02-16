import { Component  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ScriptsPowerShellService } from '../../../@core/data/scripts-power-shell.service';
import { script } from '../../../@core/models/script.model';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

@Component({
  selector: 'ng-add-script',
  templateUrl: './add-script.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }

  `],
})
export class AddScriptComponent{
	  model:script = new script();

  constructor( private http: HttpClient,
               private router: Router,
               private ScriptService : ScriptsPowerShellService,
               private route: ActivatedRoute,private ngxService: NgxUiLoaderService) {
   
     
  }


	save(){

		this.ScriptService.addScript(this.model).subscribe(data => {
       this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 700);
       
          // OR
          this.ngxService.startBackground('do-background-things');
          // Do something here...
          this.ngxService.stopBackground('do-background-things');
       
          this.ngxService.startLoader('loader-01'); 
          setTimeout(() => {
            this.ngxService.stopLoader('loader-01');
          }, 700);
          
          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);  
    },
  (error)=>
  { console.log(error['error'].text)
         this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 700);
       
          // OR
          this.ngxService.startBackground('do-background-things');
          // Do something here...
          this.ngxService.stopBackground('do-background-things');
       
          this.ngxService.startLoader('loader-01'); 
          setTimeout(() => {
            this.ngxService.stopLoader('loader-01');
          }, 700);
        if(error['error'].text=='Success')
        {
            

          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);  
          console.log(error['error'].text)
         
        }else{
           var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);
                 
        }
  });
  


	}
	 Back()
  {
  this.router.navigate(['/pages/scripts/scripts-power-shell']) 
  }
 
   
}
