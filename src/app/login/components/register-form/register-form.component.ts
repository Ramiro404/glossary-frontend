import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  form:FormGroup;
  errorMsg=""
  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private router:Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
   }

  ngOnInit(): void {
  }

  onSubmit():void{
    if(this.form.valid){
      const user:Partial<User> = this.form.getRawValue();
      this.userService.create(user).subscribe(
        (data)=>{
          this.router.navigate(['auth/login']);
        },
        (err:HttpErrorResponse)=>{
          this.errorMsg=err.message;
        }
      )
    }else{
      this.form.markAllAsTouched();
    }
    
  }

}
