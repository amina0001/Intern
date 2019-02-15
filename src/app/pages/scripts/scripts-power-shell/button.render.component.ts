
import { Component, Input, OnInit,EventEmitter, Output} from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  template: `
    <button style="background:transparent;border:none;font-size:30px;color:gray" class="btn-exec"><i class="nb-play " ></i></button>
  `,
   styles: [`
  


  `],
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