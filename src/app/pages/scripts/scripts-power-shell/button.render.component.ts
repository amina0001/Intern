
import { Component, Input, OnInit,EventEmitter, Output} from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  template: `
    <button ><i class="nb-play " ></i> {{renderValue}}</button>
  `,
})
export class ButtonRenderComponent implements OnInit {

  public renderValue;
  //@Output() save: EventEmitter<any> = new EventEmitter();
  @Input() value;
  @Input() rowData: any;
  constructor(private router: Router) {  }

  ngOnInit() {
   //     this.renderValue = this.value.toString().toUpperCase();
  //  this.renderValue = this.value;
  }



}