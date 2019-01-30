import { Injectable } from '@angular/core';

@Injectable()
export class SmartTableService {

  data = [{
    firstName: 'Mark',
    lastName: 'Otto',
    username: '@mdo',
   
  }, {
    firstName: 'Jacob',
    lastName: 'Thornton',
    username: '@fat',
    
  }, {
    firstName: 'Larry',
    lastName: 'Bird',
    username: '@twitter',
    
  } ];

  getData() {
    return this.data;
  }
}
