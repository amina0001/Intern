import { Component,OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgForm } from '@angular/forms';
import { configuration_others } from '../../../@core/models/configuration_others.model';
import { Smtp } from '../../../@core/models/smtp.model';
import { SettingService } from '../../../@core/data/settings.service';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';
import { AdminDirectory } from '../../../@core/models/AdminDirectory.model';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-configuration',
  templateUrl: './configuration.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }


  `],
    providers: [ SettingService ]
})
export class ConfigurationComponent implements OnInit  {
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  model:configuration_others = new configuration_others();
  smtp :Smtp = new Smtp()
  adminDirectory : AdminDirectory = new AdminDirectory()
  hidden:boolean
  hiddensmtp:boolean  
  hiddenADF:boolean 
  hiddenAD:boolean
  
  constructor(  private router: Router,private settingService: SettingService,private ngxService: NgxUiLoaderService) { 
           
               }
  saveSmtp()
  {  this.hidden=true
     this.hiddensmtp=true
   // console.log(this.model)
    this.smtp.to = this.model.mail
    this.smtp.password = this.model.Password
    this.smtp.port=this.model.Port
    this.smtp.servername = this.model.Server_name
    this.smtp.account = this.model.User_account
    
    this.settingService.addSmtp(this.smtp).subscribe(
      data =>{
        this.hidden=false
      },
    error =>{  
      if(error['error'].text=='Message has been sent')
      {
        this.hidden=false
      //  console.log("good")      
      }else
      {
      //  console.log(error['error'].text)
        this.hidden=true
         this.hiddensmtp=false

      }
    })   


  }
  verifyAdminDirectory()
  {  this.hiddenAD=true
        this.hiddenADF=true
      this.adminDirectory.login = this.model.Forest_name
      this.adminDirectory.server = this.model.Service_account
      this.adminDirectory.password = this.model.passwordad
      this.adminDirectory.domain =  ""
     // console.log(this.adminDirectory)
      this.settingService.verifyAdminDirectory(this.adminDirectory).subscribe(
      	data=>{},
      	error=>{
        if(error['error'].text=='successful')
        {
          this.hiddenAD=false
         // console.log(error['error'].text)
         
        }else
        {
         // console.log(error['error'].text)
          this.hiddenAD=true
          this.hiddenADF=false

        }
      })
      
  }
  addSetting(setting)
  {
   // console.log(setting)
    this.settingService.addSetting(setting.value)
      .subscribe(data => {
      //  console.log(setting.value)
              this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 300);

         
         },
  (error)=>
  {// console.log(error['error'].text)
        
        if(error['error'].text=='successful')
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
      })
  }

  ngOnInit() {

    this.hidden=true
    this.hiddensmtp=true
    this.hiddenADF=true
    this.hiddenAD=true
   
  }

}
