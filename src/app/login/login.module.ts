import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PasswordMailComponent } from './components/password-mail/password-mail.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    LoginPageComponent,
    PasswordMailComponent,
    PasswordRecoveryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  exports: [RegisterFormComponent]
})
export class LoginModule { }
