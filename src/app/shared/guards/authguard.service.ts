import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService  implements CanActivate {

  user:any
  constructor(private router: Router,public data:DataService) { }

  isAuthenticated (allowedRoles: string[]){
    this.data.currentData.subscribe(user => this.user = JSON.parse(user))
    if (this.user!=null && (allowedRoles == null || allowedRoles.length === 0)) {
      return true;
    }

    if(this.user!=null && allowedRoles.includes(this.user.UserType)){
      return true
    }
    
    return false
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    const allowedRoles = next.data.allowedRoles;
    if(this.isAuthenticated(allowedRoles)){
      return true
    }
    this.router.navigate(['/login']);
    return false;
  }
}
