
import { Component, TemplateRef, ViewChild,OnInit   } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbWindowService   } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';

import {BreadcrumbsService} from "ng6-breadcrumbs";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { UserService } from '../../../@core/data/users.service';
import { GroupService } from '../../../@core/data/group.service';

import { user } from '../../../@core/models/user.model';
import * as $ from 'jquery';
@Component({
  selector: 'ngx-list-user-groups',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})

export class ListUserGroupsComponent implements OnInit {

 todo:string[]; 
  done:string[]; 
  count:number; 
LIST_IDS:string[]; 
response:any;
constructor(  private http: HttpClient,
               private routers: Router,
               private breadcrumbs:BreadcrumbsService,
               private UserService : UserService,
               private windowService: NbWindowService,
               private route: ActivatedRoute,
            ) {
    
  
    }
async ngOnInit(){

this.todo=[];
this.done=[];
this.LIST_IDS=[];




        }
                
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {   
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
   }
}