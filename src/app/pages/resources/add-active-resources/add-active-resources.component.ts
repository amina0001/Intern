import { Component, OnInit} from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';

import * as $ from 'jquery';


@Component({
  selector: 'ng-add-active-resources',
  templateUrl: './add-active-resources.component.html',
  styleUrls: ['./add-active-resources.component.css','./add-active-resources.component.scss'],

})
export class AddActiveResourcesComponent implements OnInit {
  
  disabledDate :any
  disabled:any
  disabledReference :any
  disabledSerial:any
  disabledComment : any



  ngOnInit() {
  
    this.disabledDate = true
    this.disabled = true
    this.disabledSerial = true
    this.disabledReference = true
    this.disabledComment = true
  }
  selectChangeHandler(event:any)
  {
    console.log("ggh")
    console.log(event.target.value )
  }
  

  
gg()
{
    $(document).ready(function(){
 var _Date =$('#NoDate').button('toggle')[0].checked
 if (_Date==true) {
  this.disabledDate = true
  if(($('#NoDate').button('toggle')[0].labels[0].className =="btn btn-default btn-off "))
  {
    $('#NoDate').button('toggle')[0].labels[0].className ="btn btn-default btn-off active"
    $('#YesDate').button('toggle')[0].labels[0].className ="btn btn-default btn-on "
  }  
  else 
    if($('#NoDate').button('toggle')[0].labels[0].className =="btn btn-default btn-off active")
    {
      $('#NoDate').button('toggle')[0].labels[0].className ="btn btn-default btn-off active"
      $('#YesDate').button('toggle')[0].labels[0].className ="btn btn-default btn-on "
    }
 }else
 { 
  if(_Date== false)
  this.disabledDate = false
  $('#NoDate').button('toggle')[0].labels[0].className ="btn btn-default btn-off "
  $('#YesDate').button('toggle')[0].labels[0].className ="btn btn-default btn-on  active"
 }
 });
}
 reference()
{
  console.log($('#YesDate').button('toggle')[0].labels[0].className)
  console.log($('#NoDate').button('toggle')[0].labels[0].className)

 var _Reference =$('#NoReference').button('toggle')[0].checked
 
 if (_Reference==true)
  {
    if(($('#NoReference').button('toggle')[0].labels[0].className =="btn btn-default btn-off "))
    {
      $('#NoReference').button('toggle')[0].labels[0].className ="btn btn-default btn-off active"
      $('#YesReference').button('toggle')[0].labels[0].className ="btn btn-default btn-on "
    }  
    else 
      if($('#NoReference').button('toggle')[0].labels[0].className =="btn btn-default btn-off active")
      {
        $('#NoReference').button('toggle')[0].labels[0].className ="btn btn-default btn-off active"
        $('#YesReference').button('toggle')[0].labels[0].className ="btn btn-default btn-on "
      }

     
  this.disabledReference = true
  }
 else{ if(_Reference== false)
  this.disabledReference = false
  $('#NoReference').button('toggle')[0].labels[0].className ="btn btn-default btn-off "
  $('#YesReference').button('toggle')[0].labels[0].className ="btn btn-default btn-on  active"
 }
}
serial()
{
 var _Serial =$('#NoSerial').button('toggle')[0].checked
 
 if (_Serial==true) {
  if(($('#NoSerial').button('toggle')[0].labels[0].className =="btn btn-default btn-off "))
  { 
    $('#NoSerial').button('toggle')[0].labels[0].className ="btn btn-default btn-off active"
    $('#YesSerial').button('toggle')[0].labels[0].className ="btn btn-default btn-on "
  }  
  else 
    if($('#NoSerial').button('toggle')[0].labels[0].className =="btn btn-default btn-off active")
    {
      $('#NoSerial').button('toggle')[0].labels[0].className ="btn btn-default btn-off active"
      $('#YesSerial').button('toggle')[0].labels[0].className ="btn btn-default btn-on "
    }
  this.disabledSerial = true
  
 }else{ if(_Serial== false)
this.disabledSerial = false
$('#NoSerial').button('toggle')[0].labels[0].className ="btn btn-default btn-off "
$('#YesSerial').button('toggle')[0].labels[0].className ="btn btn-default btn-on  active"
 }
}
comment()
{
 var _Comment =$('#Nocomment').button('toggle')[0].checked
 console.log("true");
 if (_Comment==true) {
  if(($('#Nocomment').button('toggle')[0].labels[0].className =="btn btn-default btn-off "))
  {
    $('#Nocomment').button('toggle')[0].labels[0].className ="btn btn-default btn-off active"
    $('#Yescomment').button('toggle')[0].labels[0].className ="btn btn-default btn-on "
  }  
  else 
    if($('#Nocomment').button('toggle')[0].labels[0].className =="btn btn-default btn-off active")
    {
      $('#Nocomment').button('toggle')[0].labels[0].className ="btn btn-default btn-off active"
      $('#Yescomment').button('toggle')[0].labels[0].className ="btn btn-default btn-on "
    }
  this.disabledComment = true
  
 }else
 { if(_Comment== false)
  this.disabledComment = false
  $('#Nocomment').button('toggle')[0].labels[0].className ="btn btn-default btn-off "
  $('#Yescomment').button('toggle')[0].labels[0].className ="btn btn-default btn-on  active"
 }
}

}
