import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionBase } from '../models/QuestionBase';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  constructor() { }
  toFormGroup(questions: QuestionBase<string>[]): FormGroup{
    const group:any = {};
    questions.forEach(question => {
      group[question.key] = question.required ?
        new FormControl(question.value || '', Validators.required) :
        new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
