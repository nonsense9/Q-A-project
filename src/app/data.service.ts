import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Question, Answer} from './interfaces';

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

  constructor(private http: HttpClient) {
  }

  public getQuestions(): Observable<Question[]> {
    return this.http
      .get<{
        results: Question[];
      }>(`${this.REST_API_SERVER}/Question`, this.headers)
      .pipe(map((res: { results: Question[] }) => res.results));
  }

  public getAnswers(questionId: string): Observable<Answer[]> {
    return this.http
      .get<{
        results: Answer[];
      }>(`${this.REST_API_SERVER}/Answer`, {
        headers: this.headers.headers,
        params: {
          where: JSON.stringify({
            questionId
          })
        }
      })
      .pipe(map((res) => res.results));
  }

  public createQuestion(title: string): Observable<Question> {
    return this.http.post<Question>(
      `${this.REST_API_SERVER}/Question`,
      {title, answerLength: 0, upVote: 0, downVote: 0},
      this.headers
    );
  }

  public createAnswer(text: string, questionId: string, answerLength: number, upVote: number = 0, downVote: number = 0):
    Observable<Answer> {
    this.updateQuestion(questionId, answerLength, upVote, downVote).subscribe()
    return this.http.post<Answer>(
      `${this.REST_API_SERVER}/Answer`,
      {text, questionId, upVote, downVote},
      this.headers
    );
  }

  public editQuestions(title: string, objectId: string): Observable<Question> {
    return this.http.put<Question>(
      `${this.REST_API_SERVER}/Question/${objectId}`,
      {title},
      this.headers
    )
  }

  public editAnswers(text: string, objectId: string): Observable<Answer> {
    return this.http.put<Answer>(
      `${this.REST_API_SERVER}/Answer/${objectId}`,
      {text},
      this.headers
    );
  }

  public updateQuestion(objectId: string, answerLength: number, upVote?: number, downVote?: number): Observable<Answer> {
    return this.http.put<Answer>(
      `${this.REST_API_SERVER}/Question/${objectId}`,
      {answerLength, upVote, downVote},
      this.headers
    );
  }

  public deleteQuestion(objectId: string) {
    return this.http.delete<Question>(
      `${this.REST_API_SERVER}/Question/${objectId}`,
      this.headers
    );
  }

  public deleteAnswer(objectId: string, questionId: string, answerLength: number, upVote: number, downVote: number) {
    this.updateQuestion(questionId, answerLength, upVote, downVote).subscribe()
    return this.http.delete<Answer>(
      `${this.REST_API_SERVER}/Answer/${objectId}`,
      this.headers
    );
  }
}

