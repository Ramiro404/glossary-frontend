import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { QuestionBase } from '../models/QuestionBase';
import { RadioQuestion } from '../models/QuestionRadio';
import {IQuestion } from "../models/Question.model";
import { QUESTIONS } from '../utils/mocks/question.mock';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private API_URL = `${environment.api}/questions`;
  constructor(
    private http: HttpClient
  ) { }

  getQuestions() {
    return of(QUESTIONS.sort((a,b) => a.order - b.order));
  }

  saveQuestions(questionData: any[]) {
    return this.http.post<IQuestion>(`${this.API_URL}/answers`, questionData);
  }

  deleteQuestionWithAnswers(id:number) {
    return this.http.delete<any>(`${this.API_URL}/category/${id}`);
  }

  getQuestionsWithAnswers(categoryId: number) {
    return this.http.get<any[]>(`${this.API_URL}/category/${categoryId}`);
  }

}
