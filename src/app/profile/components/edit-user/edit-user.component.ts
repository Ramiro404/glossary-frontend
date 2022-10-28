import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  form:FormGroup;
  errorMsg="";
  id:string | null=null;
  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute
  ) { 
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params)=>{
        this.id = params.get('id');
        console.log(this.id)
        if(this.id){
          this.userService.findOne(this.id).subscribe(
            (data)=>{
              this.form.patchValue({
                name:data.name,
                lastname: data.lastname,
                email:data.email,
              });
            },
            (err:HttpErrorResponse)=>{
              this.errorMsg=err.message;
            }
          )
        }
      }
    )
  }

  onSubmit():void{
    if(this.form.valid){
      const user:Partial<User> = this.form.getRawValue();
      console.log(user)
      this.userService.update(this.id||"0",user).subscribe(
        (data)=>{
          this.router.navigate(['../profile',this.id]);
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
