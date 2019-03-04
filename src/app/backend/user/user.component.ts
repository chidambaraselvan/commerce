import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData: any
  height: string
  innerheight: string
  searchvalue:string
  copyUserData:any
  public viewUser: User = null;
  constructor(public user: UserService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.user.changeUserViewObserve.subscribe(() => {
      this.user.getUsers().then((res) => {
        this.userData = res
        this.copyUserData = res
      })
      this.height = (window.innerHeight - 64).toString() + 'px';
      this.innerheight = (window.innerHeight - 193.5).toString() + 'px';
    })
  }

  viewDetail(user: User) {
    this.viewUser = user
    this.user.changeView(false);
  }

  searchUser(value:string){
    console.log(value);
    if(value !=""){
      this.userData = this.copyUserData.filter((x:User)=>{
        return x.Name.toLowerCase().includes(value.toLowerCase())
      })
    }else{
      this.userData = this.copyUserData
    }
  }

  createUser(){
    this.user.changeView(true)
  }
}
