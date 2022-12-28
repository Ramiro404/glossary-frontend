import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAnswer, IQuestion } from 'src/app/models/Question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-questionary',
  templateUrl: './questionary.component.html',
  styleUrls: ['./questionary.component.scss']
})
export class QuestionaryComponent implements OnInit {
  quiz: IQuestion[] = [];
  quizAnswers: IQuestion[] = [];

  currentQuestion: IQuestion | undefined;
  index: number = 0;
  btnSubmit = true;
  btnNext = false;
  showResults = false;
  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.questionService.getQuestionsWithAnswers(+id).subscribe((data: IQuestion[]) => {
          this.quiz = data;
          this.currentQuestion = this.quiz[this.index];
          this.getControlType();
          if (this.quiz.length == 1) {
            this.btnNext = true;
            this.btnSubmit = false;
          }



        });
      }
    });
  }

  getControlType(): void {
    if (this.currentQuestion) {
      const totalCorrect = this.currentQuestion.answers.reduce((sum, answer) => {
        if (answer.isCorrect)
          return sum++;
        return sum;
      }, 0);
      this.currentQuestion.control = totalCorrect > 1 ? 'checkbox' : 'radio';
    }
  }



  saveAnswers(): void {
    let selectedAnswers: IAnswer[] = [];
    let i = 0;
    this.currentQuestion?.answers.forEach((answer: IAnswer) => {
      if (answer.isSelected) {
        this.quiz[this.index].answers[i].isSelected = true;
        selectedAnswers.push(answer);
      }
      i++;
    });
    if (this.currentQuestion) {
      const { id, question, control } = this.currentQuestion;
      this.quizAnswers.push({
        id,
        question,
        control,
        answers: selectedAnswers
      })
    }

  }

  nextQuestion(): void {
    if (this.quiz.length - 1 == this.index) {
      this.btnNext = true;
      this.btnSubmit = false;
    } else {
      this.saveAnswers();
      this.index++;
      this.currentQuestion = this.quiz[this.index];
      this.getControlType();
    }
  }

  onSubmit(): void {

    // this.quiz = {...this.quizAnswers};
    console.log(this.quiz);
    this.showResults = true;
  }

}
