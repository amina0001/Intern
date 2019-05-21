import { Component  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ScriptsPowerShellService } from '../../../@core/data/scripts-power-shell.service';
import { script } from '../../../@core/models/script.model';
import {Observable, of} from 'rxjs';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    dragAndDropExample = [];
    username:any;
    profile:any;
    reqHeader: any;
     apiUrl = environment.apiUrl;
         autocompleteItems = ['get', '-c', '-u', 'Get ','-Help' ,'-Name' ,'-Service','Parameter ','Name','update',
         'New','-ADComputer','-Name','-SamAccountName','-Path' ,'-ADGroup','-GroupCategory','Security', '-GroupScope',
          'Global' ,'-DisplayName','-Description','-ADUser','-SamAccountName','-AccountPassword','-AsPlainText', '-Force','-DisplayName'
          ,'-Enabled', '-GivenName','"CN=Users,,DC=Domain,DC=com"', '-Server','-Surname','-UserPrincipalName','-ADOrganizationalUnit'
          ,'"DC=Domain,DC=com"','-ADGroupMember','-Members','Remove','SecurityGroupName' ,'-AdmPwdPassword', '-ComputerName',
          '-Credential', '-Restart', '-Force','Enable','-ADAccount', '-Identity','Disable','Unlock','Search','-AccountDisabled'
          ,'Test','-ComputerSecureChannel','New-ADComputer -Name' ,'New-ADGroup -Name','New-ADUser -Name' ,'New-ADOrganizationalUnit -Name',
          ,'Add-ADGroupMember SecurityGroupName -Members','Add','Get-AdmPwdPassword -ComputerName','Add-Computer -DomainName'
          ,'Enable-ADAccount','Disable-ADAccount','Unlock-ADAccount','Search-ADAccount','Test-ComputerSecureChannel','get-command'
          ,'Get-ADDomainController','Get-ADFineGrainedPasswordPolicy','-filter','Get-ADDefaultDomainPasswordPolicy'
          ,'invoke-command','-Properties','Get-ADUser','Find-Module'];


  constructor( private http: HttpClient,
               private router: Router,
               private ScriptService : ScriptsPowerShellService,
               private authservice: AuthService,private LocalStorageService: LocalStorageService,
               private route: ActivatedRoute,private spinner: NgxSpinnerService) {
   this.model.Body=[];

  }
  async ngOnInit() {
     this.username = this.LocalStorageService.retriveUserAccount();
          this.reqHeader = new HttpHeaders({"Authorization": "Bearer " + this.authservice.authentication.token});

       if(this.username.Login =="Administrator"){
       
      
         }else if(this.username.Login !="Administrator"){
               await  this.http.get(this.apiUrl+`/formytek/public/api/UserProfile/${this.username[0].Username}`,{ headers: this.reqHeader })
                
                .toPromise().then(

                (response) => {
                    this.profile = response['profile'];
                })

               console.log("hey"+this.profile)
                if(this.profile['add_script']!=1)
           {
              this.router.navigate(['/pages/dashboard']) ;

           }
            
      }
        
         
}
onAdd = (item): Observable<string>  => {
       console.log("here1"+item)

     var script_item= item
    this.model.Body.push(script_item); 
    return of(item);
  
  }
	save(){
    this.spinner.show();

		this.ScriptService.addScript(this.model).subscribe(data => {
    
            setTimeout(() => {
        
        this.spinner.hide();
});
         
          
          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
    },
  (error)=>
  {
         
        if(error['error'].text=='Success')
        {
            
     setTimeout(() => {
        
        this.spinner.hide();
});
          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
        // console.log(error['error'].text)
         
        }else{
               setTimeout(() => {
        
        this.spinner.hide();
});
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

}
