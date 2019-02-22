import { Component,OnInit} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../../../@core/data/group.service';
import { group } from '../../../@core/models/group.model';

@Component({

  selector: 'ng-update-group',
  templateUrl: './update-groupe.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    

  `],
     providers: [ GroupService]

})
export class UpdateGroupComponent implements OnInit{

    model:group = new group();
        sub:any;
    name:string;

 constructor(  private routers: Router,private GroupService :GroupService,private route:ActivatedRoute,private ngxService: NgxUiLoaderService)
 {

}
  ngOnInit() {
    this.sub = this.route.snapshot.params['p1'];
      this.name = this.sub;

    console.log("fff"+this.sub);
 this.GroupService.getGroup(this.sub).subscribe(data =>  {
  console.log("dd"+data[0].Name)
    console.log("dd"+data[0].Description)

   this.model.Name=data[0].Name
this.model.Description =data[0].Description


  },
  (error)=>
  {
  });
 console.log("out"+this.name);
  }

 updateGroup(){ 
console.log(this.model)
      this.ngxService.start(); 

    this.GroupService.UpdateGroup(this.model).subscribe(data =>  {


     
  },
  (error)=>
  { 
      console.log(error['error'].text);
    
      if(error['error'].text=="Success")
     { 
            this.ngxService.stop(); 
       
          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);
    }else{
         var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);
    }
      });

}
 Back()
  {
  this.routers.navigate(['/pages/groups/users']) 
  }
 
}
