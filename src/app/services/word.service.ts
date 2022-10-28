import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Word } from '../models/Word.model';
import { HandlerError } from '../utils/HandleError';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private URL_BASE = `${environment.api}/words`
  constructor(
    private http:HttpClient
  ) { }

  findAll(id:string):Observable<Word[]>{
    return this.http.get<Word[]>(`${this.URL_BASE}/category/${id}`).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }
  findOne(id:string):Observable<Word>{
    return this.http.get<Word>(`${this.URL_BASE}/${id}`).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }
  create(word:Partial<Word>):Observable<Word>{
    return this.http.post<Word>(`${this.URL_BASE}`,word).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }
  delete(id:string):Observable<unknown>{
    return this.http.delete<unknown>(`${this.URL_BASE}/${id}`).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }
  update(id:string,word:Partial<Word>):Observable<Word>{
    return this.http.patch<Word>(`${this.URL_BASE}/${id}`,word).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }

}
