import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from 'src/app/services/password.service';
import { Validator } from 'src/app/utils/Validator';

@Component({
  selector: 'app-password-mail',
  templateUrl: './password-mail.component.html',
  styleUrls: ['./password-mail.component.scss']
})
export class PasswordMailComponent implements OnInit {
  form:FormGroup;
  btnDisabled:boolean = false;
  message="";
  constructor(
    private fb:FormBuilder,
    private passwordService:PasswordService
  ) {
      this.form = fb.group({
        email: ['',[Validators.required, Validators.email]]
      })
   }

  ngOnInit(): void {
  }

  onSubmit():void{
    if(this.form.valid){
      const email = this.form.getRawValue();
      this.btnDisabled = true;
      this.passwordService.sendEmail(email).subscribe(
        (response)=>{
          this.message="Email has been sent, check your email and follow the instructions."
        },
        (err:HttpErrorResponse)=>{
          this.message ="An error ocurred. Try it later."
        }
      )
    }else{
      this.form.markAllAsTouched();
    }
  }

}
