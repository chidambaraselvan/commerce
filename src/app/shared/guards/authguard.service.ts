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

  isAuthenticated (){
    this.data.currentData.subscribe(user => this.user = user)
    if(this.user !== null){
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
