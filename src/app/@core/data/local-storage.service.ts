import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    /**
     * store
     */
    public storeAuthentication(authentication: string) {

        localStorage.setItem('authentication', authentication)
    }

    /**
     * storeUserData
     */
    public storeUserAccount(user_data: string) {
		
		localStorage.setItem('user', user_data);
	}

	 /**
     * storeUserData
     */
    public storeUserProfile(user_data: string) {
		
		localStorage.setItem('profile', user_data);
	}

	/**
	 * retriveAuthentication
	 */
	public retriveAuthentication() {
		
		return JSON.parse(localStorage.getItem('authentication'));
	}

	/**
	 * retriveUserAccount
	 */
	public retriveUserAccount() {
		
		return JSON.parse(localStorage.getItem('user'));
	}
	public retriveUserProfile() {
		
		return JSON.parse(localStorage.getItem('profile'));
	}


	/**
	 * clean
	 */
	public clean() {
		
		localStorage.clear();
	}
}
