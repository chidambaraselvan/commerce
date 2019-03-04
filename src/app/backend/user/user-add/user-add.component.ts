import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  editForm: FormGroup
  imageFile: string = null
  constructor(public fb: FormBuilder, public userService: UserService, private snackBar: MatSnackBar, public data: DataService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      UserType: ['', Validators.required],
    });
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
    this.userService.changeView(false);
  }

  remove() {
    this.imageFile = null
  }

  onSubmit() {
    console.log(this.editForm.value);
    this.userService.createUser(this.editForm.value,this.imageFile).then((res)=>{
      console.log(res)
      let snackBarRef = this.snackBar.open("User created Successfully");
      snackBarRef.afterDismissed().subscribe(() => {
        this.userService.currentUserViewChange(true)
      })
    })
  }
}
