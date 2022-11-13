import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { DynamicFormBuilderComponent } from './components/dynamic-form-builder/dynamic-form-builder.component';


@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    QuestionPageComponent,
    DynamicFormBuilderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuestionRoutingModule
  ]
})
export class QuestionModule { }
