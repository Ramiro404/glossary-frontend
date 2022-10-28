import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PasswordMailComponent } from './components/password-mail/password-mail.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: '', component: LoginPageComponent,
    children: [
      { path: 'login', component: LoginFormComponent},
      { path: 'register', component:RegisterFormComponent},
      { path: 'send-email', component: PasswordMailComponent},
      { path: 'recovery-password', component: PasswordRecoveryComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
