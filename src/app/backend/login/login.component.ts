import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  error:string ="";
  user:any
  spinnerShow:boolean

  constructor(public fb: FormBuilder, public userService: UserService,public router:Router, public data:DataService) { }

  ngOnInit() {
    this.spinnerShow=false;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.data.currentData.subscribe(user=>this.user = user)
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return
    }else{
      this.spinnerShow= true;
      this.userService.loginUser(this.loginForm.value).then((res)=>{
        if(res == "Password not Match"){
          this.error = "Incorrect Password"
        }else if(res == "Email not Registered"){
          this.error = "Enter Registered Email Address"
        }else{
          this.spinnerShow= false;
          sessionStorage.setItem("user",JSON.stringify(res))
          this.loginForm.reset()
          this.data.changeData(JSON.stringify(res))
          this.router.navigate(["/"])
        }
      }).catch((err)=>{
        console.log(err.error);
      })
    }
  }

}
