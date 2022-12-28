import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ExitGuard } from '../guards/exit.guard';
import { DynamicFormBuilderComponent } from './components/dynamic-form-builder/dynamic-form-builder.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { EditQuestionaryComponent } from './components/edit-questionary/edit-questionary.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { QuestionaryComponent } from './components/questionary/questionary.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';

const routes: Routes = [
  {path: '', component: QuestionPageComponent, canActivate: [AuthGuard], children: [
    { path: 'categories', component: ListCategoriesComponent},
    {path: 'form/:id', component: DynamicFormComponent},
    {path: 'create/:id', component: DynamicFormBuilderComponent, canDeactivate: [ExitGuard]},
    {path: 'edit/:id', component: EditQuestionaryComponent, canDeactivate: [ExitGuard]},
    {path: 'quiz/:id', component: QuestionaryComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
