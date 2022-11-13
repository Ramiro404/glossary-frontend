import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/models/QuestionBase';
import { QuestionControlService } from 'src/app/services/question-control.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  questions$:Observable<QuestionBase<any>[]>;
  @Input() questions: QuestionBase<string>[] |null = [];
  form!:FormGroup;
  payload = '';
  constructor(
    private qcs:QuestionControlService,
    questionService:QuestionService
  ) {
    this.questions$ = questionService.getQuestions();
  }

  ngOnInit(): void {
    this.questions$.subscribe(data=>{
      this.questions = data;
      this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
    })

  }

  onSubmit() {
    this.payload = JSON.stringify(this.form.getRawValue());
  }

}
