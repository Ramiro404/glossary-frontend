import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WebsitePageComponent } from './pages/website-page/website-page.component';

const routes: Routes = [
  {
    path: '', component: WebsitePageComponent,
    children: [
      { path: '', title:'Glossary App', component:HomePageComponent},
      { path: 'auth', title: 'Iniciar sesión', loadChildren: () => import('../login/login.module').then(m => m.LoginModule) },
      {
        path: 'category',
        title: 'Categorias',
        loadChildren:
          () => import('../category/category.module').then(m => m.CategoryModule),
        canActivate: [AuthGuard] },
      { path: 'word', title:'Word', loadChildren: ()=>import('../word/word.module').then(m => m.WordModule)},
      { path: 'profile', title:'Profile', loadChildren: ()=> import('../profile/profile.module').then(m => m.ProfileModule)},
      { path: 'question', title: 'Question', loadChildren: ()=> import('../question/question.module').then(m => m.QuestionModule)}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
