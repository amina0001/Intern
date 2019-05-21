import { Component ,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ScriptsPowerShellService } from '../../../@core/data/scripts-power-shell.service';
import { script } from '../../../@core/models/script.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';
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
    id:string;
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
               private route: ActivatedRoute,
               private spinner: NgxSpinnerService,
               private authservice: AuthService,private LocalStorageService: LocalStorageService,
               ) {
   this.model.Body=[];
  }


	update(){
                       this.spinner.show();

		this.ScriptService.editScript(this.model).subscribe(data => {
       

          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
                this.spinner.hide();

    },
  (error)=>
  {
        if(error['error'].text=='Success')
        {
          var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
      
        }else{
           var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);
                 
        }
                this.spinner.hide();

  });

	}
	 Back()
  {
  this.router.navigate(['/pages/scripts/scripts-power-shell']) 
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

                if(this.profile['update_script']!=1)
           {
              this.router.navigate(['/pages/dashboard']) ;

           }
            
      }
     setTimeout(() => {
             this.spinner.show();
      this.sub = this.route.snapshot.params['p1'];
      this.id = this.sub;
     this.ScriptService.getById(this.id).subscribe(

      data=>{    

        let result:any=data;
        this.model.id = this.id
        this.model.Name = result.Name
        this.model.Body = result.Body
        this.spinner.hide();
      }) 
      })
 
}
}
