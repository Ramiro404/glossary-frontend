import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from 'src/app/models/QuestionBase';
import { QuestionControlService } from 'src/app/services/question-control.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.scss']
})
export class DynamicFormBuilderComponent implements OnInit {
  questions: QuestionBase<string>[] |null = [];
  form!:FormGroup;
  constructor(
    private qcs:QuestionControlService,
    questionService:QuestionService
  ) { }

  ngOnInit(): void {
  }

}
