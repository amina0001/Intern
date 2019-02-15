import { Component ,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ScriptsPowerShellService } from '../../../@core/data/scripts-power-shell.service';
import { script } from '../../../@core/models/script.model';

@Component({
  selector: 'ng-update-script',
  templateUrl: './update-script.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }

  `],
})
export class UpdateScriptComponent  implements OnInit{
	  model:script = new script();
   sub:any;
     id:string

  constructor( private http: HttpClient,
               private router: Router,
               private ScriptService : ScriptsPowerShellService,
               private route: ActivatedRoute,) {
   
  }


	update(){

		this.ScriptService.editScript(this.model).subscribe(data => {
    },
  (error)=>
  {
  });
      this.router.navigate(['/pages/scripts/scripts-power-shell']) 

	}
	 Back()
  {
  this.router.navigate(['/pages/scripts/scripts-power-shell']) 
  }
 
    ngOnInit() {
    
      this.sub = this.route.snapshot.params['p1'];
      this.id = this.sub;
     this.ScriptService.getById(this.id).subscribe(
      data=>{      
        let result:any=data;
        this.model.id = this.id
        this.model.Name = result.Name
        this.model.Body = result.Body
     console.log(this.model.id);
      })
 

}
}