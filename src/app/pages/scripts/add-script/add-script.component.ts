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
    dragAndDropExample = ['C#', 'Java'];
    items = ['Javascript', 'Typescript'];
    inputText = 'text';

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
          }, 300);
       
         
          
          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
    },
  (error)=>
  {// console.log(error['error'].text)
         this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 700);
       
         
        if(error['error'].text=='Success')
        {
            

          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
        // console.log(error['error'].text)
         
        }else{
           var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);
                 
        }
  });
  


	}
	 Back()
  {
  this.router.navigate(['/pages/scripts/scripts-power-shell']) 
  }
 
  insertInputTag(){
    console.log(this.inputText)
        if (this.inputText) {
            this.items.push(this.inputText);

            this.inputText = '';
        }
    }
}
