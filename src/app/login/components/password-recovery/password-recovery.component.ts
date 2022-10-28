import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from 'src/app/services/password.service';
import { Validator } from 'src/app/utils/Validator';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  form:FormGroup;
  token!:string;
  message="";
  btnDisabled=false;
  constructor(
    private fb:FormBuilder,
    private passwordService:PasswordService,
    private route:ActivatedRoute,
    private router:Router
  ) { 
    this.form = this.fb.group({
      password: ['',[Validators.required, Validators.minLength(8)]],
      confirmPassword: ['',[Validators.required, Validator.matchPasswords]]
    },{
      validators: Validator.matchPasswords
    })
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (params)=>{
          const token = params.get('token');
          if(token){
            this.token = token;
          }
      }
    )
      
  }

  onSubmit():void{
    if(this.form.valid){
      const newPassword = this.form.get('confirmPassword')?.value;
      console.log(newPassword)
      this.btnDisabled=true
      this.passwordService.changePassword(this.token,newPassword).subscribe(
        (res)=>{
          this.message="Password updated succesfully, you will be redirected to login in a moment.";
          setTimeout(()=>{
            this.router.navigate(['auth/login']);
          },2000)
        }
      )
    }else{
      this.form.markAllAsTouched();
    }
  }

}
