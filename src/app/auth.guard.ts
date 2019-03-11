import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Injectable} from '@angular/core';
import {CustomerService} from '../app/@core/data/customer.service';

@Injectable({ providedIn: 'root' })
export class NeedAuthGuard implements CanActivate {

  constructor( private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('authentication')) {
      // logged in so return true
      return true;
  }
  // not logged in so redirect to login page with the return url
  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  return false;
  }
}