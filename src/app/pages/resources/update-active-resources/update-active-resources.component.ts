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
  selector: 'ng-update-active-resources',
  templateUrl: './update-active-resources.component.html',
  styleUrls: ['./update-active-resources.component.css','./update-active-resources.component.scss'],
       providers: [ ResourceService]

})
export class UpdateActiveResourcesComponent implements OnInit {
  model:resource = new resource();

  disabledDate :boolean
  disabled:boolean
  disabledReference :boolean
  disabledSerial:boolean
  disabledComment : boolean
  sub:any;
  id:any;
constructor( private http: HttpClient,
               private routers: Router,
               private ResourceService : ResourceService,
               private windowService: NbWindowService,
               private route: ActivatedRoute,private ngxService: NgxUiLoaderService) {
             
      

  
    }

  ngOnInit() {
    this.sub = this.route.snapshot.params['p1'];
      this.id = this.sub;
    console.log("fff"+this.sub);
 this.ResourceService.getResource(this.sub).subscribe(data =>  {
console.log(data)
console.log(data[0])

   this.model.id=data["id"]
this.model.Status =data["Status"]
this.model.Type =data["Type"]
this.model.Categorize =data["Categorize"]
this.model.Name =data["Name"]
this.model.Description =data["Description"]
this.model.Internal_information=data["Internal_information"]
if(data["Status"] == "Enabled"){

  $("#Disabled").parent().removeClass(" active");
  $('#Enabled').parent().addClass("active");
}
if(data["Type"] == "Access"){

  $("#Hardware").parent().removeClass(" active");
  $("#Software").parent().removeClass(" active");

  $("#Other").parent().removeClass(" active");

  $('#Access').parent().addClass("active");
}else if(data["Type"] == "Hardware"){

  $("#Hardware").parent().addClass(" active");
  $("#Software").parent().removeClass(" active");

  $("#Other").parent().removeClass(" active");

  $('#Access').parent().removeClass("active");
}else if(data["Type"] == "Software") {

  $("#Hardware").parent().removeClass(" active");
  $("#Software").parent().addClass(" active");

  $("#Other").parent().removeClass(" active");

  $('#Access').parent().removeClass("active");
}else if(data["Type"] == "Other"){

  $("#Hardware").parent().removeClass(" active");
  $("#Software").parent().removeClass(" active");

  $("#Other").parent().addClass(" active");

  $('#Access').parent().removeClass("active");
}
if(data["Expiration_date"]!=null)
      {this.model.Expiration_date=data["Expiration_date"]
    $('.ExpirationDateClass').prop("disabled", false); 

  
  $("#NoDate").parent().removeClass(" active");
  $('#YesDate').parent().addClass("active");
      }else{
            $('.ExpirationDateClass').prop("disabled", true); 
$("#NoDate").parent().addClass(" active");
  $('#YesDate').parent().removeClass("active");

        }


   if(data["Serial_number"]!=null)
   {      $('.SerialNumberClass').prop("disabled", false); 

    this.model.Serial_number=data["Serial_number"]
      $('#NoSerial').parent().removeClass(" active");
  $('#YesSerial').parent().addClass(" active");
   }else{
           $('.SerialNumberClass').prop("disabled", true); 
      
      $('#NoSerial').parent().addClass("active")
      $('#YesSerial').parent().removeClass(" active");
   }



    if(data["Reference"]!=null)
    {this.model.Reference=data["Reference"]
    $('.ReferenceClass').prop("disabled", false); 
       $('#NoReference').parent().removeClass(" active");
  $('#YesReference').parent().addClass(" active");
    }else{
         $('#NoReference').parent().addClass("active")
      $('#YesReference').parent().removeClass(" active");
       $('.ReferenceClass').prop("disabled", true); 
    }

    if( data["Comment"]!=null)
    {    $('.CommentClass').prop("disabled", false); 
          $('#Nocomment').parent().removeClass(" active");
      $('#Yescomment').parent().addClass(" active");
        this.model.Comment=data["Comment"]
    }else{
            $('#Nocomment').parent().addClass("active")
      $('#Yescomment').parent().removeClass(" active");
          $('.CommentClass').prop("disabled", true); 

    }
  },
  (error)=>
  {
  });

  }
  selectChangeHandler(event:any)
  {
    console.log("ggh")
    console.log(event.target.value )
  }



EditResource(resource){
 
// Status
 if ($('#Disabled').prop("checked")== true)
 {
  this.model.Status ="Disabled"
 }
 else
 {
  this.model.Status ="Enabled"
 }
 //Type
 if ($('#Hardware').prop("checked")== true)
 {
  this.model.Type ="Hardware"
 }
 if ($('#Software').prop("checked")== true)
 {
  this.model.Type ="Software"
 }
 if ($('#Access').prop("checked")== true)
 {
  this.model.Type ="Access"
 }
 if ($('#Other').prop("checked")== true)
 {
  this.model.Type ="Other"
 }
  this.model.id =this.id.toString()
  this.ResourceService.EditResource(this.model).subscribe(data => {
   
 this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 300);
   var x = document.getElementById("snackbar");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 9000); 
  }),
(error)=>
{
  this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 300);
           var x = document.getElementById("snackbar2");
          x.className = "show";
         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 9000);  
};
}
  
gg()
{console.log("here0")
    $(document).ready(function(){
 var _Date =$('#NoDate').prop("checked")
 console.log(_Date)
 if (_Date==true) {
   console.log("here#")
    $('.ExpirationDateClass').prop("disabled", true); 
$('#ExpirationDate').css('background','grey')
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
 Back()
  {
  this.routers.navigate(['/pages/resources/active-resources']) 
  }

}
