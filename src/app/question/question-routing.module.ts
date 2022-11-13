import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormBuilderComponent } from './components/dynamic-form-builder/dynamic-form-builder.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';

const routes: Routes = [
  {path: '', component: QuestionPageComponent, children: [
    {path: '', component: DynamicFormComponent},
    {path: 'create', component: DynamicFormBuilderComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
