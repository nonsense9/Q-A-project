import {DialogAnswerComponent} from '../dialog-answer/dialog-answer.component';
import {MatDialog} from '@angular/material/dialog';
import {Component, Input, OnInit} from '@angular/core';

import {DataService} from '../data.service';
import {Answer, Question} from '../interfaces';
import {DialogEditComponent} from '../dialog-edit/dialog-edit.component';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit {
  answers: Answer[] = [];

  questionId: string

  question: Question;

  constructor(
    private answerService: DataService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const state = this.router.getCurrentNavigation().extras.state;
    if (!state) {
      this.router.navigateByUrl('/questions')
      return
    }
    this.question = state.question
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.questionId = params.id
      this.getAllAnswers();
    })
  }

  getAllAnswers() {
    this.answerService.getAnswers(this.questionId).subscribe((answers: Answer[]) => {
      this.answers = answers;
    });
  }

  createAnswerDialog() {
    let dialogRef = this.dialog.open(DialogAnswerComponent, {
      height: '300px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((text) => {
      if (text && text.trim()) {
        this.question.answerLength = this.question.answerLength + 1
        this.answerService.createAnswer(text, this.questionId, this.question.answerLength).subscribe(() => {
          this.getAllAnswers();
        });
      }
    });
  }

  deleteAnswer(objectId) {
    this.question.answerLength = this.question.answerLength - 1
    this.answerService.deleteAnswer(objectId, this.question.objectId, this.question.answerLength).subscribe(() => {
      this.answers = this.answers.filter(
        (answer: Answer) => answer.objectId !== objectId)
      this.getAllAnswers()
    });
  }

  editAnswerDialog(answer) {
    let dialogRef = this.dialog.open(DialogEditComponent, {
      height: '300px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((text) => {
      if (text.trim()) {
        this.answerService.editAnswers(text, answer.objectId).subscribe((text: Answer) => {
          this.answers = this.answers.filter(
            ({objectId}) => answer.objectId !== objectId
          );
          this.answers = [...this.answers, {objectId: answer.objectId, ...text}];
          this.getAllAnswers();
        });
      }
    })
  }
}

