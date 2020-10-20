import {DialogAnswerComponent} from '../dialog-answer/dialog-answer.component';
import {MatDialog} from '@angular/material/dialog';
import {Component, OnInit} from '@angular/core';

import {DataService} from '../data.service';
import {Answer} from '../interfaces';
import {DialogEditComponent} from '../dialog-edit/dialog-edit.component';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit {
  answers: Answer[] = [];
  questionId: string

  constructor(private answerService: DataService, public dialog: MatDialog, private route: ActivatedRoute) {
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
      if (text) {
        this.answerService.createAnswer(text, this.questionId).subscribe(() => {
          this.getAllAnswers();
        });
      }
    });
  }


  deleteAnswer(objectId) {
    this.answerService.deleteAnswer(objectId).subscribe(() => {
      this.answers = this.answers.filter(
        (answer: Answer) => answer.objectId !== objectId
      );
    });
  }

  editAnswerDialog(answer) {

    let dialogRef = this.dialog.open(DialogEditComponent, {
      height: '300px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((text) => {
      if (text) {
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

