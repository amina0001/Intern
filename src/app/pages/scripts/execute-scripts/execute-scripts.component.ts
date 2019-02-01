import { Component, OnInit} from '@angular/core';
import {FormControl, FormArray, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'execute-scripts',
  templateUrl: './execute-scripts.component.html',

})
export class ExecuteScriptComponent implements OnInit {
	TotalLine:number=1;

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
  c:number=0
    invoiceForm: FormGroup;

    constructor(
               private _fb: FormBuilder,
               private router: Router,
            ) {
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
 ngOnInit() {
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()]) // here
    });
}
