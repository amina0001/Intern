
import { Component, OnInit,OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../../app/@core/data/auth.service';
export class Input {
    constructor() {}

    private _value: any;
    private _validationClass: string;
    private _error: string;

    
    public get value() : any {
        return this._value;
    }

    
    public get validationClass() : string {
        return this._validationClass;
    }

    
    public get error() : string {
        return this._error;
    }

    
    public set value(v : any) {
        this._value = v;
    }

    
    public set validationClass(v : string) {
        this._validationClass = v; 
    }
    
    
    public set error(v : string) {
        this._error = v;
    }
        
}

@Component({ selector: 'ngx-app-auth',
  templateUrl: 'login.component.html'})
export class LoginComponent implements OnChanges {
        loading = false;
        invalid=true;
        res:any[];
  constructor(private _auth_service: AuthService, private _router: Router) {

        this._emailInput = new Input();
        this._passwordInput = new Input();
    }
    
    private _emailInput: Input;

    private _passwordInput: Input;
    
    /**    
     * onFormSubmit
     */
    public async onFormSubmit() {
        
        try {
          this.invalid=true
                    this.loading=true


            //console.log(this._emailInput.value+"+"+this._passwordInput.value)
            this._auth_service.authenticate(this._emailInput.value, this._passwordInput.value)
            .then(
              (success)=>{
                //console.log("redirect")
                                    
                                   

              },(error)=>{
                       this.invalid=false
                        this.loading=false

              }
              );
              

              

        } catch (error) {
          //console.log("catching error");

          if (error._email || error._password) {
   
           if (error._email) {
       
               this._emailInput.validationClass = 'is-invalid';
       
               this._emailInput.error = error._email;
           } else {
       
               this._emailInput.validationClass = 'is-valid';
           }
       
           if (error._password) {
       
               this._passwordInput.validationClass = 'is-invalid'
       
               this._passwordInput.error = error._password;
           } else {
       
               this._passwordInput.validationClass = 'is-valid';
           }
       
       } else {
       
           this._emailInput.error = 'oops! try again please.';
       
           this._emailInput.validationClass = 'is-invalid';
       
           this._passwordInput.validationClass = 'is-invalid';
       
           this._passwordInput.error = '';
       }
        }
    }


    /**
     * ngOnInit
     */
    public ngOnChanges() {
        
        if (this._auth_service.isAuthenticated()) {
            this._router.navigateByUrl('/pages/dashboard');
        } else {
            this._router.navigateByUrl('/login');
        }
    }
}