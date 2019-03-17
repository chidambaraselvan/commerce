import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData:User
  show:boolean = false;
  showView = new BehaviorSubject(this.show);
  currentView = this.showView.asObservable();
  
  change:boolean = false;
  changeUserView = new BehaviorSubject(this.change);
  changeUserViewObserve = this.changeUserView.asObservable();

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get('http://localhost:52253/api/User').toPromise()
  }

  createUser(value:any,image?:string,userType?:string){
    const data:User ={
      UserId:0,
      Name:value.name,
      Email:value.email,
      Password:value.passwords != undefined ? value.passwords.password: value.password,
      UserType: userType,
      UserImg: image !=="" ? image:null
    }
    return this.http.post("http://localhost:52253/api/User",data).toPromise()
  }

  loginUser(value:any){
    const data:User ={
      UserId:0,
      Name:"",
      Email:value.email,
      Password:value.password,
      UserType:"Admin",
      UserImg:null
    }
    return this.http.post("http://localhost:52253/api/login",data).toPromise()
  }

  putUser(id:number,value:any,image:string){
    const data:User ={
      UserId:id,
      Name:value.name,
      Email:value.email,
      Password:value.password,
      UserType:value.UserType,
      UserImg:image
    }
    return this.http.put("http://localhost:52253/api/updateUser?id="+id,data).toPromise()
  }

  deleteUser(id:number){
    return this.http.delete('http://localhost:52253/api/delete?id='+id).toPromise()
  }

  changeView(value:boolean){
    this.showView.next(value);
  }

  currentUserViewChange(value:boolean){
    this.changeUserView.next(value);
  }

}
