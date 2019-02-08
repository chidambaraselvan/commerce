import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user:any = sessionStorage.getItem("user");
  public userData = new BehaviorSubject(this.user);
  currentData = this.userData.asObservable();

  constructor() { }

  changeData(data:any){
    this.userData.next(data)
  }
  
}
