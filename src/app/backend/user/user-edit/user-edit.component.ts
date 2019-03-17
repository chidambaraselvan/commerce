import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit,OnDestroy{
  editForm: FormGroup
  imageFile: string = null
  @Input() editUserDetail: User
  @Output() chooseComp = new EventEmitter<boolean>();
  constructor(public fb: FormBuilder, public userService: UserService, private snackBar: MatSnackBar, public data: DataService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      name: [this.editUserDetail.Name, Validators.required],
      email: [this.editUserDetail.Email, [Validators.required, Validators.email]],
      password: [this.editUserDetail.Password, Validators.required],
      UserType: [this.editUserDetail.UserType, Validators.required],
    });
    this.imageFile = this.editUserDetail.UserImg
  }

  onDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();

    const image: any = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageFile = e.target.result
    }
    reader.readAsDataURL(image);
  }

  dragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }

  dragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }

  dragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }

  goBack() {
    this.chooseComp.emit(false);
    this.userService.changeView(false);
  }

  remove() {
    this.imageFile = null
  }

  onSubmit() {
    console.log(this.editForm.value);
    this.userService.putUser(this.editUserDetail.UserId,this.editForm.value,this.imageFile).then((res)=>{
      console.log(res)
      let snackBarRef = this.snackBar.open("User Details updated Successfully");
      snackBarRef.afterDismissed().subscribe(() => {
        this.userService.currentUserViewChange(true)
        this.chooseComp.emit(false);
        const user = JSON.parse(sessionStorage.getItem('user'));
        if(user.UserId == this.editUserDetail.UserId){
          const data:User ={
            UserId:this.editUserDetail.UserId,
            Name:this.editForm.value.name,
            Email:this.editForm.value.email,
            Password:this.editForm.value.password,
            UserType:this.editForm.value.UserType,
            UserImg:this.imageFile
          }
          this.data.changeData(JSON.stringify(data));
          sessionStorage.setItem('user',JSON.stringify(data));
        }
      })
    })
  }

  ngOnDestroy(){
    this.chooseComp.emit(false);
  }
}
