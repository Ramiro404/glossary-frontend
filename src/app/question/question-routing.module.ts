import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ExitGuard } from '../guards/exit.guard';
import { DynamicFormBuilderComponent } from './components/dynamic-form-builder/dynamic-form-builder.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';

const routes: Routes = [
  {path: '', component: QuestionPageComponent, canActivate: [AuthGuard], children: [
    {path: '', component: DynamicFormComponent},
    {path: 'create', component: DynamicFormBuilderComponent, canDeactivate: [ExitGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
