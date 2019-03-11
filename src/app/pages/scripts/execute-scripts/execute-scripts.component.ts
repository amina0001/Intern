import { Component, OnInit} from '@angular/core';
import {FormControl, FormArray, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { script } from '../../../@core/models/script.model';
import { ScriptsPowerShellService } from '../../../@core/data/scripts-power-shell.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

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

  c:number=0
    invoiceForm: FormGroup;

    constructor(
               private _fb: FormBuilder,  private ScriptService : ScriptsPowerShellService,
               private router: Router,private route:ActivatedRoute,private ngxService: NgxUiLoaderService) {
        this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 300);
       
         
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
{             this.hiddenSCP=true
             this.hiddenNull=true

  if(this.TotalLine!=0)
  {
      $("#BtnAdd").hide();
  }
  this.allScript = "" 
  if( $("#script").val()!=undefined)
  {
    this.Command =$("#script").val();
    this.allScript= this.allScript +$("#script").val()
  }
   for(this.c=0; this.c<this.TotalLine;this.c++)
   {     
      if( $("#script"+this.c).val() != undefined)
      {
        this.allScript= this.allScript+" "+$("#script"+this.c).val()
      } 
   }
    this.Laoder = true 
    this.ScriptService.executeScript("powershell -command " +this.allScript).subscribe(data => {
      //console.log(data)   
        if (data==null){
             var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
        } 
      },
   error=>{
    if(error['error'].text)
        {           this.hiddenSCP=false

               
         //   console.log("not null")

          this.errooorSC=(error['error'].text)
         
        }
      })
   this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 300);


    
  }   
  back()
  {
  this.router.navigate(['/pages/scripts/scripts-power-shell']) 
  }
 ngOnInit() {
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
     
      })
 

}
 
}
