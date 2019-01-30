import { Injectable } from '@angular/core';

@Injectable()
export class ActiveResourcesService {

  data = [{
    categorize: 'Poste de travail',
    status: 'Enable',
    type: 'Hardware',
    name: 'test',
    description: 'test',
    internal: 'test',
   
  }, {
     categorize: 'Poste de travail',
    status: 'Disable',
    type: 'Hardware',
    name: 'test',
    description: 'test',
    internal: 'test',
    
  }, {
     categorize: 'Poste de travail',
    status: 'Enable',
    type: 'Access',
    name: 'test',
    description: 'test',
    internal: 'test',
    
  } ];

  getData() {
    return this.data;
  }
}
