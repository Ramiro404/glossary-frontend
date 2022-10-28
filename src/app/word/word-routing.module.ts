import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWordComponent } from './components/list-word/list-word.component';
import { WordDetailComponent } from './components/word-detail/word-detail.component';
import { WordFormComponent } from './components/word-form/word-form.component';
import { WordPageComponent } from './pages/word-page/word-page.component';

const routes: Routes = [
  {
    path:'', component:WordPageComponent,
      children: [
        {path: 'new-word/:category', component: WordFormComponent},
        {path: ':category', component: ListWordComponent },
        {path: ':category/:word', component: WordDetailComponent},
        {path: 'edit/:category/:word', component: WordFormComponent},

      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordRoutingModule { }
