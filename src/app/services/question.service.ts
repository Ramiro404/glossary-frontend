import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { QuestionBase } from '../models/QuestionBase';
import { RadioQuestion } from '../models/QuestionRadio';
import { QUESTIONS } from '../utils/mocks/question.mock';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  getQuestions() {
    return of(QUESTIONS.sort((a,b) => a.order - b.order));
  }

  addQuestion() {
    return of(QUESTIONS.push(
      new RadioQuestion({
        label: '',
        key: `${uuidv4()}`,
      })
    ));
  }

  addAnswer() {

  }
}
