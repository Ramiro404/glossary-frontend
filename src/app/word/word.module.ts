import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordRoutingModule } from './word-routing.module';
import { ListWordComponent } from './components/list-word/list-word.component';
import { WordPageComponent } from './pages/word-page/word-page.component';
import { WordDetailComponent } from './components/word-detail/word-detail.component';
import { WordFormComponent } from './components/word-form/word-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    ListWordComponent,
    WordPageComponent,
    WordDetailComponent,
    WordFormComponent
  ],
  imports: [
    CommonModule,
    AngularEditorModule,
    ReactiveFormsModule,
    WordRoutingModule
  ]
})
export class WordModule { }
