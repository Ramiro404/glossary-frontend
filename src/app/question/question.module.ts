import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { DynamicFormBuilderComponent } from './components/dynamic-form-builder/dynamic-form-builder.component';
import { DynamicFormBuilderQuestionComponent } from './components/dynamic-form-builder-question/dynamic-form-builder-question.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { EditQuestionaryComponent } from './components/edit-questionary/edit-questionary.component';
import { QuestionaryComponent } from './components/questionary/questionary.component';
import { QuizResultsComponent } from './components/quiz-results/quiz-results.component';


@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    QuestionPageComponent,
    DynamicFormBuilderComponent,
    DynamicFormBuilderQuestionComponent,
    ListCategoriesComponent,
    EditQuestionaryComponent,
    QuestionaryComponent,
    QuizResultsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QuestionRoutingModule
  ]
})
export class QuestionModule { }
