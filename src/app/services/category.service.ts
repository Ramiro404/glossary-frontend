import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category.model';
import { HandlerError } from '../utils/HandleError';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private URL_BASE = `${environment.api}/categories`
  constructor(
    private http:HttpClient
  ) { }

  findAll(id:string):Observable<Category[]>{
    return this.http.get<Category[]>(`${this.URL_BASE}/user/${id}`).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }
  findOne(id:string):Observable<Category>{
    return this.http.get<Category>(`${this.URL_BASE}/${id}`).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }
  save(category:Partial<Category>): Observable<Category>{
    return this.http.post<Category>(`${this.URL_BASE}`,category).pipe(
      retry(3),
      catchError((err:HttpErrorResponse)=> HandlerError.handleErrors(err))
    )
  }
  update(id:string,category:Partial<Category>): Observable<Category>{
    return this.http.patch<Category>(`${this.URL_BASE}/${id}`,category).pipe(
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
}
