import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() userDetail: User;
  public editUser: User = null;
  public userData:any
  show: boolean;
  constructor(public user: UserService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user.currentView.subscribe((show: boolean) => {
      this.show = show;
    })
    this.user.changeUserViewObserve.subscribe(() => {
      this.user.getUsers().then((res) => {
        this.userData = res
        if(this.editUser!=null){
          const singleUser= this.userData.filter((x:User)=>{
            return x.UserId == this.editUser.UserId
          })
          this.userDetail = singleUser[0];
          console.log(this.userData);
        }
      })
    })
  }

  edit(user: User) {
    this.editUser = user;
    this.user.changeView(true);
  }

  delete(id: number) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user.UserId == id) {
      let snackBarRef = this.snackBar.open("Current User, Can't be deleted!");
      snackBarRef.afterDismissed().subscribe(() => {
        console.log('Active user!')
      })
    } else {
      this.user.deleteUser(id).then((res) => {
        let snackBarRef = this.snackBar.open("User deleted Successfully");
        snackBarRef.afterDismissed().subscribe(() => {
          this.user.currentUserViewChange(true)
          this.userDetail=null
          this.show=false
          this.user.changeView(this.show);
        })
      })
    }
  }
}
