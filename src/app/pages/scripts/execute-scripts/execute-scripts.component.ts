import { Component, OnInit} from '@angular/core';
import {FormControl, FormArray, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { script } from '../../../@core/models/script.model';
import { ScriptsPowerShellService } from '../../../@core/data/scripts-power-shell.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/data/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as $ from 'jquery';

@Component({
  selector: 'execute-scripts',
  templateUrl: './execute-scripts.component.html',

})
export class ExecuteScriptComponent implements OnInit {
	TotalLine:number=1;
          sub:any;
    model:script = new script();

  hidden:boolean=false
  hiddenAdd:Boolean=true
  hiddenDetail:Boolean=true
  hiddenExecute:Boolean=true
  Laoder:boolean = true
  table :any
  id:string
  script:string
  global:number
  Command:string=""
  allScript:string=""
  errooorSC:string=""
  hiddenSCP:boolean
    hiddenNull:boolean
    username:any;
    profile:any;
    reqHeader: any;
     apiUrl = environment.apiUrl;
  c:number=0
    invoiceForm: FormGroup;
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
               private _fb: FormBuilder,  private ScriptService : ScriptsPowerShellService,
               private router: Router,private route:ActivatedRoute,private spinner: NgxSpinnerService,
               private authservice: AuthService,private LocalStorageService: LocalStorageService,) {
       
         
           this.hiddenSCP=true
           this.hiddenNull=true
              this.createForm();
            }

    createForm(){
      this.invoiceForm = this._fb.group({
        itemRows: this._fb.array([])
      });
      this.invoiceForm.setControl('itemRows', this._fb.array([]));
    }
  get invoiceparticularsArray(): FormArray{
	  return this.invoiceForm.get('invoiceparticulars') as FormArray;
  }
    initItemRows()
  {
    return this._fb.group({
        // list all your form controls here, which belongs to your form array
        itemname: [''],
       
    });
  }
  addNewRow(i) 
{
    if(i==0)
    {
      $("#BtnAdd").hide();
    }
    this.TotalLine++;
    // control refers to your formarray
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    $("#BtnAdd"+i).hide();//+
    control.push(this.initItemRows());  
}
deleteRow(index: number) 
{
  this.TotalLine--;
  // control refers to your formarray
  const control = <FormArray>this.invoiceForm.controls['itemRows'];
  // remove the chosen row
 if(index==this.TotalLine)
 {
  $("#BtnAdd"+(index-1)).show();//+
 }
 if(index==0 && this.TotalLine == 1 )
 {
  $("#BtnAdd").show();//+
 }
  control.removeAt(index);
}
executeScript()
{   
             this.spinner.show();
          
   this.hiddenSCP=true
             this.hiddenNull=true

  if(this.TotalLine!=0)
  {
      $("#BtnAdd").hide();
  }
  this.allScript = "" 
 
    this.Command =this.model.Body.join(" ");
    this.allScript= this.allScript + this.model.Body.join(" ");
  
   for(this.c=0; this.c<this.TotalLine;this.c++)
   {     
      if( $("#script"+this.c).val() != undefined)
      {
        this.allScript= this.allScript+" "+$("#script"+this.c).val()
      } 
   }
    this.Laoder = true 
 
   
       
    this.ScriptService.executeScript("powershell -command " +this.allScript).subscribe(data => {
             this.spinner.show();
        if (data==null){
             var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
        } 
           setTimeout(() => {
        this.spinner.hide();
          });
      },
   error=>{
    if(error['error'].text)
        {           this.hiddenSCP=false

               
         //   console.log("not null")

          this.errooorSC=(error['error'].text)
         
        }
           setTimeout(() => {
        this.spinner.hide();
          });
      })
                  
          

    
  }   
  back()
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

               console.log("hey"+this.profile)
                if(this.profile['execute_script']!=1)
           {
              this.router.navigate(['/pages/dashboard']) ;

           }
            
      }
          setTimeout(() => {
             this.spinner.show();

       
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()]) // here
    });
      this.sub = this.route.snapshot.params['p1'];
      this.id = this.sub;
     this.ScriptService.getById(this.id).subscribe(
      data=>{      
        let result:any=data;
        this.model.id = result.Id
        this.model.Name = result.Name
        this.model.Body = result.Body
        
        this.spinner.hide();
      })
 
          });
}
 
}
