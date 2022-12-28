import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckboxQuestion } from 'src/app/models/CheckboxQuestion.model';
import { QuestionBase } from 'src/app/models/QuestionBase';
import { RadioQuestion } from 'src/app/models/QuestionRadio';
import { QuestionControlService } from 'src/app/services/question-control.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  questions$: Observable<QuestionBase<any>[]>;
  categoryId: number | undefined;
  cuestionary: any[] = [];
  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payload = '';
  constructor(
    private qcs: QuestionControlService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
  ) {
    this.questions$ = questionService.getQuestions();

  }

  ngOnInit(): void {
    this.getId();
    if (this.categoryId)
      this.questionService.getQuestionsWithAnswers(this.categoryId).subscribe(
        (cuestionary) => {
          cuestionary.forEach((question:any) => {
            let qbase = new CheckboxQuestion({
              label: question.question,
              key: question.id
            });
            question.answers.forEach((answer:any) => {
              qbase.options.push({
                key: answer.answer,
                value: answer.answer
              });
            });
            this.questions?.push(qbase);
          });
          this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        })
    // this.questions$.subscribe(data=>{
    //   this.questions = data;
    //   this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
    // })


  }
  getId() {
    this.route.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id) {
        this.categoryId = +id;
      }
    });
  }



  onSubmit() {
    this.payload = JSON.stringify(this.form.getRawValue());
  }

}
