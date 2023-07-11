import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    const res: boolean = !!this.authService.auth.data;
    return this.authService.isAuth();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    const res: boolean = !!this.authService.auth.data;
    console.log(`canActivateChild checking for url ${url}`, res);
    return this.authService.isAuth();
  }

  canLoad(route: Route): boolean {
    const res: boolean = this.authService.authenticated$.value;
    return this.authService.isAuth();
  }
  /*
  checkLogin(url: string): boolean {
    console.log("checkLogin for ", url)

    if (url === '/login') { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Create a dummy session id
    const sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: { session_id: sessionId },
      fragment: 'anchor'
    };



    if (url === '/article-center' && !this.authService.serverModel.modelName.includes('MiukaFoto')) {
      return false;
    }

    if (this.authService.isLoggedIn()) { 
      console.log("isLoggedIn = true for url", url)
      return true; 
    }

    return false;
  }
  */

}
