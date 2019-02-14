import { Component  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ScriptsPowerShellService } from '../../../@core/data/scripts-power-shell.service';
import { script } from '../../../@core/models/script.model';

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
               private route: ActivatedRoute,) {
   
     
  }


	save(){

		this.ScriptService.addScript(this.model).subscribe(data => {
    },
  (error)=>
  {
  });
	}
	 Back()
  {
  this.router.navigate(['/pages/scripts/scripts-power-shell']) 
  }
 
   
}
