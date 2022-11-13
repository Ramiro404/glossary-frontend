import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentUserGuard } from '../guards/current-user.guard';
import { ExitGuard } from '../guards/exit.guard';
import { RegisterFormComponent } from '../login/components/register-form/register-form.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',component:ProfilePageComponent,
    children: [
      {path: 'edit/:id', component: EditUserComponent, canActivate: [CurrentUserGuard], canDeactivate: [ExitGuard]},
      {path: ':id', component: UserDataComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
