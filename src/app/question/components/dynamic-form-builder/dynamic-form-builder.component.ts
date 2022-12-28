import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OnExit } from 'src/app/guards/exit.guard';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/models/QuestionBase';
import { RadioQuestion } from 'src/app/models/QuestionRadio';
import { QuestionControlService } from 'src/app/services/question-control.service';
import { QuestionService } from 'src/app/services/question.service';
import { Validator } from 'src/app/utils/Validator';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.scss']
})
export class DynamicFormBuilderComponent implements OnInit, OnExit {
  form:FormGroup;
  canExit: boolean = false;
  categoryId: number| null = null;
  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      questions: this.fb.array([])
    });
  }

  onExit(): boolean | Observable<boolean> | Promise<boolean> {
    if(this.canExit) return true;
    const exit = confirm('You are going to leave without save changes, confirm to exit.');
    return exit;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (params) => {
      let id = params.get('id')
      if(id) {
        this.categoryId = +id;
      }
    })
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
    console.log(this.form.value, ' ', this.categoryId);


    if(this.form.valid && this.categoryId){
      const questions = this.form.value.questions.map((question: any) => {
        return {
          ...question,
          categoryId: this.categoryId
        }
      });

      this.questionService.saveQuestions(questions).subscribe(
        (response) => {
          this.canExit =true;
          this.router.navigateByUrl('question/categories');
        },
        (error: HttpErrorResponse) => {
          console.error(error)
        }
      )
    } else {
      this.form.markAllAsTouched();
    }
  }

}
