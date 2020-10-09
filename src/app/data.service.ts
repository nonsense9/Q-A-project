import { Question, Answer } from './interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly REST_API_SERVER = 'http://localhost:1337/parse/classes';

  private headers = {
    headers: {
      'X-Parse-Application-Id': 'test-app',
      'X-Parse-REST-API-Key': 'test-app-key',
      'Content-Type': 'application/json',
    },
  };

  constructor(private http: HttpClient) {}

  public getQuestions(): Observable<Question[]> {
    return this.http
      .get<{
        results: Question[];
      }>(`${this.REST_API_SERVER}/Question`, this.headers)
      .pipe(map((res) => res.results));
  }

  public getAnswers(): Observable<Answer[]> {
    return this.http
      .get<{
        results: Answer[];
      }>(`${this.REST_API_SERVER}/Answer`, this.headers)
      .pipe(map((res) => res.results));
      
  }

  public createQuestion(title: string): Observable<Question> {
    return this.http.post<Question>(
      `${this.REST_API_SERVER}/Question`,
      { title },
      this.headers
    );
  }

  public createAnswer(text: string): Observable<Answer> {
    return this.http.post<Answer>(
      `${this.REST_API_SERVER}/Answer`,
      { text },
      this.headers
    );
  }

  public editAnswers(text, objectId): Observable<Answer> {
    return this.http.put<Answer>(
      `${this.REST_API_SERVER}/Answer/${objectId}`,
      {text},
      this.headers
    );
  }

  public deleteQuestion(objectId: string) {
    return this.http.delete<Question>(
      `${this.REST_API_SERVER}/Question/${objectId}`,
      this.headers
    );
  }

  public deleteAnswer(objectId: string) {
    return this.http.delete<Answer>(
      `${this.REST_API_SERVER}/Answer/${objectId}`,
      this.headers
    );
  }

}