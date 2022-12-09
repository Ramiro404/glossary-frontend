import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Auth } from 'src/app/models/Auth.model';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form:FormGroup;
  isError:boolean = false;
  constructor(
    private fb:FormBuilder,
    private loginService:LoginService,
    private tokenService:TokenService,
    private router:Router
  ) {
    this.form = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  onSubmit():void{
    if(this.form.valid){
      const credential:Credential = this.form.getRawValue();
      this.loginService.loginAndGet(credential).subscribe(
        ()=>{
          this.router.navigate(['/']);
        }, err => this.isError = true
      );
    }else{
      this.form.markAllAsTouched();
    }
  }

  closeMsgError() {
    this.isError = false;
  }

}
