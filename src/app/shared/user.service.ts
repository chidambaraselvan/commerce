import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData:User

  constructor(private http:HttpClient) { 
    
  }

  getUsers(){
    return this.http.get('http://localhost:52253/api/User').toPromise()
  }

  createUser(value:any){
    const data:User ={
      UserId:0,
      Name:value.name,
      Email:value.email,
      Password:value.passwords.password,
      UserType:"Admin"
    }
    return this.http.post("http://localhost:52253/api/User",data).toPromise()
  }

  loginUser(value:any){
    const data:User ={
      UserId:0,
      Name:"",
      Email:value.email,
      Password:value.password,
      UserType:"Admin"
    }
    return this.http.post("http://localhost:52253/api/login",data).toPromise()
  }
}
