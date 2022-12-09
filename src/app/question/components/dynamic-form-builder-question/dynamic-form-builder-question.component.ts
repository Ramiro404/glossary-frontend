import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from 'src/app/models/QuestionBase';

@Component({
  selector: 'app-dynamic-form-builder-question',
  templateUrl: './dynamic-form-builder-question.component.html',
  styleUrls: ['./dynamic-form-builder-question.component.scss']
})
export class DynamicFormBuilderQuestionComponent implements OnInit {
  @Input() question!:QuestionBase<string>;
  @Input() form!:FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
