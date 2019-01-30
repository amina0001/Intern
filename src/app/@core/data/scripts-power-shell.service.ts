import { Injectable } from '@angular/core';

@Injectable()
export class ScriptsPowerShellService {

  data = [{
    Name: 'Add user test',
  
   
  }, {
     Name: 'Add user test 2',
    
    
  }, {
     Name: 'Add user test 3',

    
  } ];

  getData() {
    return this.data;
  }
}
