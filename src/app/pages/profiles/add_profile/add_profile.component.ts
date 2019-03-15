import { Component,OnInit } from '@angular/core';

import * as $ from 'jquery';
import { profile } from '../../../@core/models/profile.model';
import { ProfileService } from '../../../@core/data/profiles.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-add-profile',
  templateUrl: './add_profile.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }


  `],
  providers: [ ProfileService]

})
export class AddProfileComponent {
		profile:profile = new profile();
 constructor(private ProfileService: ProfileService, private http: HttpClient,
               private routers: Router,
               private route: ActivatedRoute,private ngxService: NgxUiLoaderService) {
   
   }
	check_all(event){
		console.dir(event)
		if(event.target.checked==true){
		$('#consult_user')[0].checked = true;
		$('#delete_user')[0].checked = true;
		$('#add_user')[0].checked = true;
		$('#update_user')[0].checked = true;

		$('#consult_group')[0].checked = true;
		$('#delete_group')[0].checked = true;
		$('#add_group')[0].checked = true;
		$('#update_group')[0].checked = true;
		$('#add_user_group')[0].checked = true;
		$('#delete_user_group')[0].checked = true;

		$('#consult_ressource')[0].checked = true;
		$('#delete_ressource')[0].checked = true;
		$('#add_ressource')[0].checked = true;
		$('#update_ressource')[0].checked = true;

		$('#consult_script')[0].checked = true;
		$('#delete_script')[0].checked = true;
		$('#add_script')[0].checked = true;
		$('#update_script')[0].checked = true;
		$('#execute_script')[0].checked = true;

		}else{
			$('#consult_user')[0].checked = false;
		$('#delete_user')[0].checked = false;
		$('#add_user')[0].checked = false;
		$('#update_user')[0].checked = false;

		$('#consult_group')[0].checked = false;
		$('#delete_group')[0].checked = false;
		$('#add_group')[0].checked = false;
		$('#update_group')[0].checked = false;
	
		$('#consult_ressource')[0].checked = false;
		$('#delete_ressource')[0].checked = false;
		$('#add_ressource')[0].checked = false;
		$('#update_ressource')[0].checked = false;

		$('#consult_script')[0].checked = false;
		$('#delete_script')[0].checked = false;
		$('#add_script')[0].checked = false;
		$('#update_script')[0].checked = false;
		$('#add_user_group')[0].checked = false;
		$('#delete_user_group')[0].checked = false;
		$('#execute_script')[0].checked = false;

		}
	}
	Add_user(event){
		
		console.log(event.target.labels[0].textContent);
		if(event.target.checked==true){
		$('#consult_user')[0].checked = true;
			}else{
			$('#consult_user')[0].checked = false;	
			}
	}
	Update_user(event){
		
		console.log(event.target.labels[0].textContent);
		if(event.target.checked==true){
		$('#consult_user')[0].checked = true;
			}else{
			$('#consult_user')[0].checked = false;	
			}
	}
	Execute_script(event){
		
		console.log(event.target.labels[0].textContent);
		if(event.target.checked==true){
		$('#consult_script')[0].checked = true;
			}else{
			$('#consult_script')[0].checked = false;	
			}
	}
	
	Delete_user(event){
		if(event.target.checked==true){
		$('#consult_user')[0].checked = true;
		$('#add_user')[0].checked = true;
		$('#update_user')[0].checked = true;
		}else{
		$('#consult_user')[0].checked = false;
		$('#add_user')[0].checked = false;
		$('#update_user')[0].checked = false;

		}

	}
	Add_group(event){
		
		if(event.target.checked==true){
		$('#consult_group')[0].checked = true;
		}else{
		$('#consult_group')[0].checked = false;
		}

	}
	Update_group(event){
		
		if(event.target.checked==true){
		$('#consult_group')[0].checked = true;
		}else{
		$('#consult_group')[0].checked = false;
		}

	}
	Delete_group(event){
		if(event.target.checked==true){
		$('#consult_group')[0].checked = true;
		$('#add_group')[0].checked = true;
		$('#update_group')[0].checked = true;		
		}else{
		$('#consult_group')[0].checked = false;
		$('#add_group')[0].checked = false;
		$('#update_group')[0].checked = false;	

		}

	}
	Add_ressource(event){
		if(event.target.checked==true){

		$('#consult_ressource')[0].checked = true;
		}else{
		$('#consult_ressource')[0].checked = false;
		}



	}
	Update_ressource(event){
		if(event.target.checked==true){

		$('#consult_ressource')[0].checked = true;
		}else{
		$('#consult_ressource')[0].checked = false;
		}



	}
	Delete_ressources(event){
		if(event.target.checked==true){
		$('#consult_ressource')[0].checked = true;
		$('#add_ressource')[0].checked = true;
		$('#update_ressource')[0].checked = true;		
		}else{
		$('#consult_ressource')[0].checked = false;
		$('#add_ressource')[0].checked = false;
		$('#update_ressource')[0].checked = false;	

		}

	}
	Add_script(event){
		if(event.target.checked==true){

		$('#consult_script')[0].checked = true;
		}else{
		$('#consult_script')[0].checked = false;

		}


	}
		Update_script(event){
		if(event.target.checked==true){

		$('#consult_script')[0].checked = true;
		}else{
		$('#consult_script')[0].checked = false;

		}


	}
	Delete_script(event){
		if(event.target.checked==true){
		$('#consult_script')[0].checked = true;
		$('#add_script')[0].checked = true;
		$('#update_script')[0].checked = true;		
		$('#execute_script')[0].checked = true;		

		}else{
		$('#consult_script')[0].checked = false;
		$('#add_script')[0].checked = false;
		$('#update_script')[0].checked = false;	
		$('#execute_script')[0].checked = false;		

		}

	}
	save_profile(){
		if($('#consult_user')[0].checked == true){
			this.profile.consult_user="1";
		}
		if($('#delete_user')[0].checked == true){
			this.profile.delete_user="1";

		}
		if($('#add_user')[0].checked == true){
			this.profile.add_user="1";

		}
		if($('#update_user')[0].checked == true){
			this.profile.update_user="1";

		}
		if($('#consult_group')[0].checked == true){
			this.profile.consult_group="1";

		}
		if($('#delete_group')[0].checked == true){
			this.profile.delete_group="1";

		}
		if($('#add_group')[0].checked == true){
			this.profile.add_group="1";

		}
		if($('#update_group')[0].checked == true){
			this.profile.update_group="1";

		}
		if($('#add_user_group')[0].checked == true){
			this.profile.add_user_group="1";

		}
		if($('#delete_user_group')[0].checked == true){
			this.profile.delete_user_group="1";

		}
		if($('#consult_ressource')[0].checked == true){
			this.profile.consult_ressource="1";

		}
		if($('#delete_ressource')[0].checked == true){
			this.profile.delete_ressource="1";

		}
		if($('#add_ressource')[0].checked == true){
			this.profile.add_ressource="1";

		}
		if($('#update_ressource')[0].checked == true){
			this.profile.update_ressource="1";

		}
		if($('#consult_script')[0].checked == true){
			this.profile.consult_script="1";

		}
		if($('#delete_script')[0].checked == true){
			this.profile.delete_script="1";

		}
		if($('#add_script')[0].checked == true){
			this.profile.add_script="1";

		}
		if($('#update_script')[0].checked == true){
			this.profile.update_script="1";

		}
		if($('#execute_script')[0].checked == true){
			this.profile.execute_script="1";

		}
		  this.ProfileService.addProfile(this.profile).subscribe(data => {
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
  //console.log(error);
};
	}
 back()
  {
  this.routers.navigate(['/pages/profiles/profile']) 
  }
}