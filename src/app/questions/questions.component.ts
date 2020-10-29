import {DialogExampleComponent} from '../dialog-example/dialog-example.component';
import {DataService} from '../data.service';
import {Answer, Question} from '../interfaces';

import {Component, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {DialogEditComponent} from "../dialog-edit/dialog-edit.component";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {

  title: string = "Learn about: Angular"

  questions: Question[] = []

  answerLength: number = 0

  constructor(
    private questionService: DataService,
    public dialog: MatDialog,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.getAllQuestions();
  }

  navigateAnswers(question: Question) {
    this.router.navigateByUrl('/questions/' + question.objectId, {state: {question}});
  }

  getAllQuestions() {
    this.questionService.getQuestions().subscribe((questions) => {
      this.questions = questions;
    });
  }

  deleteQuestion(objectId) {
    this.questionService.deleteQuestion(objectId).subscribe(() => {
      this.questions = this.questions.filter(
        (question) => question.objectId !== objectId
      );
    });
  }

  createQuestionDialog(): void {
    const dialogRef = this.dialog.open(DialogExampleComponent, {
      height: '300px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((title) => {
      if (title && title.trim()) {
        this.questionService.createQuestion(title).subscribe(() => {
          this.getAllQuestions();
        });
      }
    });
  }

  editQuestionDialog(question) {
    let dialogRef = this.dialog.open(DialogEditComponent, {
      height: '300px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((title) => {
      if (title && title.trim()) {
        this.questionService.editQuestions(title, question.objectId).subscribe((title: Question) => {
          this.questions = this.questions.filter(
            ({objectId}) => question.objectId !== objectId
          );
          this.questions = [...this.questions, {objectId: question.objectId, ...title}];
          this.getAllQuestions();
        });
      }
    })
  }

  likeBtn(objectId: string, upVote: number) {
    this.questions = this.questions.map((question) => {
      if (question.objectId === objectId) {
        this.questionService.updateQuestion(objectId, question.answerLength, question.upVote + 1, question.downVote).subscribe()
        return {
          ...question,
          upVote: upVote + 1
        }
      }
      return question
    })
  }


  dislikeBtn(objectId: string, downVote: number) {
    this.questions = this.questions.map((question) => {
      if (question.objectId === objectId) {
        this.questionService.updateQuestion(objectId, question.answerLength, question.upVote, question.downVote + 1).subscribe()
        return {
          ...question,
          downVote: downVote + 1
        }
      }
      return question
    })
  }
}


