import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OnExit } from 'src/app/guards/exit.guard';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/models/QuestionBase';
import { RadioQuestion } from 'src/app/models/QuestionRadio';
import { QuestionControlService } from 'src/app/services/question-control.service';
import { QuestionService } from 'src/app/services/question.service';
import { Validator } from 'src/app/utils/Validator';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.scss']
})
export class DynamicFormBuilderComponent implements OnInit, OnExit {
  form:FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      questions: this.fb.array([])
    });
  }

  onExit(): boolean | Observable<boolean> | Promise<boolean> {
    const exit = confirm('You are going to leave without save changes, confirm to exit.');
    return exit;
  }

  ngOnInit(): void {
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answers: this.fb.array([])
    })
  }
  addQuestion() {
    this.questions.push(this.newQuestion());
  }

  deleteQuestion(index: number) {
    this.questions.removeAt(index);
  }

  getQuestionAnswer(index: number): FormArray {
    return this.questions.at(index).get('answers') as FormArray;
  }

  newAnswer(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required],
      isCorrect: [false]
    });
  }

  addAnswer(index: number) {
    this.getQuestionAnswer(index).push(this.newAnswer());
  }

  deleteAnswer(questionIndex: number, answerIndex: number) {
    this.getQuestionAnswer(questionIndex).removeAt(answerIndex);
  }


  onSubmit(){
    console.log(this.form.value);
  }

}
