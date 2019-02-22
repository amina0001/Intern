import { Component, OnInit} from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';
import { resource } from '../../../@core/models/resource.model';
import { ResourceService } from '../../../@core/data/resources.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

import * as $ from 'jquery';


@Component({
  selector: 'ng-add-active-resources',
  templateUrl: './add-active-resources.component.html',
  styleUrls: ['./add-active-resources.component.css','./add-active-resources.component.scss'],
       providers: [ ResourceService]

})
export class AddActiveResourcesComponent implements OnInit {
  model:resource = new resource();

  disabledDate :boolean
  disabled:boolean
  disabledReference :boolean
  disabledSerial:boolean
  disabledComment : boolean

constructor( private http: HttpClient,
               private routers: Router,
               private ResourceService : ResourceService,
               private windowService: NbWindowService,
               private route: ActivatedRoute,private ngxService: NgxUiLoaderService) {
             
      

  
    }

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
  addResource(resource){
if ($('#Disabled').prop("checked")== false && $('#Enabled').prop("checked")== false )
  { console.log("prop:"+$('#Disabled').prop("checked"));
    this.model.Status ="Disabled"
  }
  else{
 if ($('#Disabled').prop("checked")== true)
 {
  this.model.Status ="Disabled"
 }else
 {
  this.model.Status ="Enabled"
 }
}if ($('#Hardware').prop("checked")== false && $('#Software').prop("checked")== false  && $('#Access').prop("checked")== false && $('#Other').prop("checked")== false )
{
  this.model.Type ="Hardware" 
}else{
 if ($('#Hardware').prop("checked")== true)
 {
  this.model.Type ="Hardware"

 }else  if ($('#Software').prop("checked")== true)
 {
  this.model.Type ="Software"
 }
 else  if ($('#Access').prop("checked")== true)
 {
  this.model.Type ="Access"
 }
 else  if ($('#Other').prop("checked")== true)
 {
  this.model.Type ="Other"
 }
}
console.log(this.model);
  this.ResourceService.addResource(this.model).subscribe(data => {
 
       this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 300);
           var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
    }),

(error)=>
{
   this.ngxService.start(); 
          this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 300);
           var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);  
          console.log(error['error'].text)};
}

  
gg()
{console.log("here0")
    $(document).ready(function(){
 var _Date =$('#NoDate').prop("checked")
 console.log(_Date)
 if (_Date==true) {
   console.log("here#")
    $('.ExpirationDateClass').prop("disabled", true); 
  this.disabledDate = true

    console.log($('#NoDate').parent().prop('className'))

  if($('#NoDate').parent().prop('className') =="btn btn-default btn-off")
  { console.log("here1")
    $('#NoDate').parent().addClass("active")
    $('#YesDate').parent().removeClass(" active");
  }  
  else 
    if($('#NoDate').parent().prop('className') =="btn btn-default btn-off active")
    { console.log("here2")
      $('#NoDate').parent().addClass("active")
      $('#YesDate').parent().removeClass(" active");
 }
}else
 {  console.log("here3")
  if(_Date== false){
       console.log("here4")

 $('.ExpirationDateClass').prop("disabled", false); 
  this.disabledDate = false
    console.log(this.disabledDate)

  $("#NoDate").parent().removeClass(" active");
  $('#YesDate').parent().addClass("active");
}
 }
 })
}
 reference()
{
  $(document).ready(function(){
 var _Reference =$('#NoReference').prop("checked")
  console.log(_Reference)
 if (_Reference==true)
  {   $('.ReferenceClass').prop("disabled", true); 

    if(($('#NoReference').parent().prop('className')=="btn btn-default btn-off"))
    {
      $('#NoReference').parent().addClass("active")
      $('#YesReference').parent().removeClass(" active");
    }  
    else 
      if($('#NoReference').button('toggle')[0].labels[0].className =="btn btn-default btn-off active")
      {
        $('#NoReference').parent().addClass("active")
        $('#YesReference').parent().removeClass(" active");
      }

     
  this.disabledReference = true
  }
 else{ if(_Reference== false)
     console.log("llll")

   $('.ReferenceClass').prop("disabled", false); 

  $('#NoReference').parent().removeClass(" active");
  $('#YesReference').parent().addClass(" active");
}
})
}
serial()
{  $(document).ready(function(){
 var _Serial =$('#NoSerial').prop("checked")
 
 if (_Serial==true) {
      $('.SerialNumberClass').prop("disabled", true); 

  if(($('#NoSerial').parent().prop('className') =="btn btn-default btn-off"))
  { 
    $('#NoSerial').parent().addClass("active")
    $('#YesSerial').parent().removeClass(" active");
  }  
  else 
    if($('#NoSerial').parent().prop('className') =="btn btn-default btn-off active")
    {
      $('#NoSerial').parent().addClass("active")
      $('#YesSerial').parent().removeClass(" active");
    }

  
 }else{ if(_Serial== false)
   $('.SerialNumberClass').prop("disabled", false); 

$('#NoSerial').parent().removeClass(" active");
$('#YesSerial').parent().addClass("active")
 }
 })
}
comment()
{
   $(document).ready(function(){
 var _Comment =$('#Nocomment').prop("checked")
 console.log("true");
 if (_Comment==true) {
    $('.CommentClass').prop("disabled", true); 

  if(($('#Nocomment').parent().prop('className') =="btn btn-default btn-off"))
  {
    $('#Nocomment').parent().addClass("active")
    $('#Yescomment').parent().removeClass(" active");
  }  
  else 
    if($('#Nocomment').parent().prop('className') =="btn btn-default btn-off active")
    {
      $('#Nocomment').parent().addClass("active")
      $('#Yescomment').parent().removeClass(" active");
    }
  
 }else
 { if(_Comment== false)
 $('.CommentClass').prop("disabled", false); 
   $('#Nocomment').parent().removeClass(" active");
  $('#Yescomment').parent().addClass("active")
 }
})
}
 back()
  {
  this.routers.navigate(['/pages/resources/active-resources']) 
  }

}
