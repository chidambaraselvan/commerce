import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  signupForm: FormGroup
  success: boolean = false;
  error:string ="";
  matcher = new MyErrorStateMatcher();

  constructor(public fb: FormBuilder,public userService:UserService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', Validators.required],
        confirm: ['']
      }, { validator: this.matchValidator })
    });
  }

  matchValidator(group: FormGroup) {
    
    var pass = group.controls["password"].value;
    var cpass = group.controls["confirm"].value;
    
    return pass === cpass ? null : { mismatch: true }
    
  }

  onSubmit() {

    if (this.signupForm.invalid) {
      return;
    }else{
      this.userService.createUser(this.signupForm.value,"","User").then((res)=>{
        console.log(res)
        
        if(res == "Email already Exists"){
          this.error = res.toString();
          this.signupForm.reset();
        }else{
          this.success = true;
        }
        
      }).catch((err:HttpErrorResponse) =>{
        console.log(err.error);
      })
    }
  }

}
