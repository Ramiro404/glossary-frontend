import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { LoginModule } from '../login/login.module';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfilePageComponent,
    UserDataComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
