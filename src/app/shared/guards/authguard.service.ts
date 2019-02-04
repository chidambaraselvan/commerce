import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService  implements CanActivate {

  constructor(private router: Router) { }

  isAuthenticated (){
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user !== null){
      return true
    }
    return false
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    if(this.isAuthenticated()){
      return true
    }
    this.router.navigate(['/login']);
    return false;
  }
}
