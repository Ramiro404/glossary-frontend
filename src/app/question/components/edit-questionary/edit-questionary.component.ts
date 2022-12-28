import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-edit-questionary',
  templateUrl: './edit-questionary.component.html',
  styleUrls: ['./edit-questionary.component.scss']
})
export class EditQuestionaryComponent implements OnInit {
  form: FormGroup;
  canExit: boolean = false;
  categoryId: number | null = null;
  questionaire: any[] = [];
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id')
      if (id) {
        this.categoryId = +id;
        this.questionService.getQuestionsWithAnswers(this.categoryId).subscribe(data => {
          console.log(data)
          this.questionaire = data;
          let questionIndex = 0;
          data.forEach(question => {
            this.addQuestion(question.question);
            if (question.answers.length > 0) {
              question.answers.forEach((answer: any) => {
                let answerForm = {
                  answer: answer.answer,
                  isCorrect: answer.isCorrect
                }
                this.addAnswer(questionIndex, answerForm);
              });
              questionIndex++;
            }
          });
          //this.form.patchValue(data);
        }, (error: HttpErrorResponse) => {
          console.error(error);
        })
      }
    })
  }

  onExit(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.canExit) return true;
    const exit = confirm('You are going to leave without save changes, confirm to exit.');
    return exit;
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  newQuestion(question?: string): FormGroup {
    if (question) {
      return this.fb.group({
        question: [question, Validators.required],
        answers: this.fb.array([])
      });
    }
    return this.fb.group({
      question: ['', Validators.required],
      answers: this.fb.array([])
    });

  }
  addQuestion(value?: string) {
    this.questions.push(this.newQuestion(value));
  }

  deleteQuestion(index: number) {
    this.questions.removeAt(index);
  }

  getQuestionAnswer(index: number): FormArray {
    return this.questions.at(index).get('answers') as FormArray;
  }

  newAnswer(data?: any): FormGroup {
    if (data) {
      return this.fb.group({
        answer: [data.answer, Validators.required],
        isCorrect: [data.isCorrect]
      })
    }
    return this.fb.group({
      answer: ['', Validators.required],
      isCorrect: [false]
    });
  }

  addAnswer(index: number, answer?: any) {
    this.getQuestionAnswer(index).push(this.newAnswer(answer));
  }

  deleteAnswer(questionIndex: number, answerIndex: number, answer: any) {
    console.log(answer)
    //this.getQuestionAnswer(questionIndex).removeAt(answerIndex);
  }


  onSubmit() {
    console.log(this.form.value, ' ', this.categoryId);


    if (this.form.valid && this.categoryId) {
      const questions = this.form.value.questions.map((question: any) => {
        return {
          ...question,
          categoryId: this.categoryId
        }
      });

      this.questionService.deleteQuestionWithAnswers(this.categoryId).subscribe(
        (data:any)=> {
          console.log(data);
        }
      )

      this.questionService.saveQuestions(questions).subscribe(
        (response: any) => {
          this.canExit = true;
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
