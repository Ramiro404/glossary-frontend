import { Component, Input, OnInit } from '@angular/core';
import { IAnswer, IQuestion } from 'src/app/models/Question.model';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit {
  @Input('quiz') quiz: IQuestion[] | undefined;
  hits:number = 0;
  totalHits:number = 0;
  constructor() { }

  ngOnInit(): void {
    this.quiz?.forEach((question:IQuestion) => {
      question.answers.forEach((answer:IAnswer) => {
        if(answer.isCorrect) this.totalHits++;
        if(answer.isCorrect && answer.isSelected) this.hits++;
      })
    })
  }

}
