//Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { InterceptorSkipHeader } from "../../_helpers/InterceptorSkipHeader";
import { Router, ActivatedRoute } from '@angular/router';

//Services
import { LocalStorageService } from "./local-storage.service";
import { Observable } from 'rxjs/Observable';

export class AuthenticationErrorClass {

    private generalError: Object;
    private _Login: string;
    private _Password: string;



    constructor(exception?: any) {
        this.generalError = exception;
        this._Login = exception.login;
        this._Password = exception.p;
    }

    public get login(): string {
        return this._Login;
    }


    public get password(): string {
        return this._Password;
    }


}

export class AuthenticationClass {

    private _token: string;
    private _expir: string;

    constructor(t?: string, exp?: string) {
        this._token = t;
        this._expir = exp;
    }


    public get token(): string {
        return this._token;
    }


    public get expir(): string {
        return this._expir
    }

}

export class AccountClass {

    private _Login: string;
    private _Password: string;
 

    constructor(data?: any,login?: number, password?: string) {
        if (data) {
            this._Login = data.login;
            this._Password = data.password;
         
        }
    }


    public get login(): string {
        return this._Login;
    }

    public get password(): string {
        return this._Password;
    }


}
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _baseUrl = 'http://192.168.100.31:8081/formytek/public/api';
    private _currentAccount: AccountClass;
    private _authentication: AuthenticationClass;
    public invalid = true;

    constructor(private _http: HttpClient, private _local_storage: LocalStorageService, private _router: Router) {

        this._currentAccount = new AccountClass();
        this._authentication = new AuthenticationClass();
    }


    public get currentAccount(): AccountClass {
        return this._currentAccount;
    }


    public get authentication(): AuthenticationClass {
        
        let authObj = this._local_storage.retriveAuthentication();
        return new AuthenticationClass(authObj._token, authObj._expir);
    }

    /**
     * authenticate
     */
    public async authenticate(emailInput: string, paswordInput: string) {

        const headers = new HttpHeaders().set(InterceptorSkipHeader, '');
        return this._http.post(`${this._baseUrl}/Login`, { Login: emailInput, Password: paswordInput }, { headers })
            .toPromise()
            .then(
                (response) => {
                  this.invalid=true;

                    this._authentication = new AuthenticationClass(response['token'], response['expir']);
                    this.storeAuthentication(this._authentication);
                    return this._authentication;
                },

                (error) => {
                     this.invalid=false;
                 //    console.log(this.handleLoginError(error.error))
                    //this.handleLoginError(error.error);
                }
            )
             .then(
                (response) => {
                  //  console.log(response['token'])
                    this.getUserData(response['token']);
                  //  console.log("getUserDatahere");
                     this.invalid=true;


                },

                (error) => {
                   this.invalid=false;

                  //  console.log("hey"+error);

                }
            );
        
            
    }

    public handleLoginError(httpException) {

        //throw new AuthenticationErrorClass(httpException);

    }

    /**
     * register
     */
    

    /**
     * logout
     */
    public logout() {
        this._local_storage.clean();
    }

    private storeAuthentication(data: any): AuthenticationClass {

        let auth = new AuthenticationClass(data['token'], data['expir']);
        this._local_storage.storeAuthentication(JSON.stringify(auth));
      //  console.log( this._local_storage.storeAuthentication(JSON.stringify(auth)))
      //  console.log("storeAuthentication");

        return auth;
    }

    async   getUserData(token: string) {
         var reqHeader = new HttpHeaders({"Authorization": "Bearer " + token}).set(InterceptorSkipHeader, '');
                        //    console.log(reqHeader);
                        //    console.log("getuserdata1");

       await   this._http.get(`${this._baseUrl}/me`,{ headers: reqHeader })
                          .toPromise().then(

                (response) => {
                     //console.log(response);
                    // console.log( response['user']);

                    this._currentAccount = response['user'];
                    this._local_storage.storeUserAccount(JSON.stringify(this._currentAccount));
                           // console.log("getuserdata2");
                    this._router.navigateByUrl('/pages/dashboard');

                })
                .catch(
                (error) => {
                     
                 //   console.log(error);

                }
            );
    }

    public isAuthenticated(): boolean {
		
        const authObj = this._local_storage.retriveAuthentication();
        let now = moment();
        let expiration = moment(authObj._expir);
		let test = now.isBefore(expiration);
		if(typeof authObj != null){
            return (authObj._token) ? true : false;
        } else {return false;}
    }
}