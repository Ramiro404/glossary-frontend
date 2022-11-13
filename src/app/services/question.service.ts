import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { QuestionBase } from '../models/QuestionBase';
import { RadioQuestion } from '../models/QuestionRadio';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new RadioQuestion({
        label: 'What is a pug?',
        key: 'pug',
        options: [
          {key: 'pug', value: 'pig', label: 'Text1', id: 'op1'},
          {key: 'pug', value: 'dog', label: 'Text2', id: 'op2'},
          {key: 'pug', value: 'bre', label: 'Text3', id: 'op3'}
        ]
      }),
      new RadioQuestion({
        label: 'What is not a pug?',
        key: 'pug2',
        options: [
          {key: 'pug2', value: 'pig12', label: 'Text4', id: 'op4'},
          {key: 'pug2', value: 'dog22', label: 'Text5', id: 'op5'},
          {key: 'pug2', value: 'brea2', label: 'Text6', id: 'op6'}
        ]
      }),
    ];
    return of(questions.sort((a,b) => a.order - b.order));
  }
}
