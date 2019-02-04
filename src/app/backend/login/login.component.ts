import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  error:string ="";

  constructor(public fb: FormBuilder, public userService: UserService,private router:Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return
    }else{
      this.userService.loginUser(this.loginForm.value).then((res)=>{
        console.log(res);
        if(res == "Password not Match"){
          this.error = "Incorrect Password"
        }else if(res == "Email not Registered"){
          this.error = "Enter Registered Email Address"
        }else{
          this.loginForm.reset();
          sessionStorage.setItem("user",JSON.stringify(res));
          this.router.navigate(["/"]);
        }
      }).catch((err)=>{
        console.log(err.error);
      })
    }
  }

}
