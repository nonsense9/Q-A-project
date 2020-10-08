import { DialogAnswerComponent } from './../dialog-answer/dialog-answer.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

import { DataService } from './../data.service';
import { Answer } from '../interfaces';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit {
  answers: Answer[] = [];

  constructor(private answerService: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.answerService.getAnswers().subscribe((answers) => {
      this.answers = answers;
    });
  }

  createAnswerDialog() {
    let dialogRef = this.dialog.open(DialogAnswerComponent, {
      height: '250px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((text) => {
      this.answerService.createAnswer(text).subscribe((text) => {
        this.answers = [...this.answers, { ...text }];
      });
    });
  }

  deleteAnswer(objectId) {
    this.answerService.deleteAnswer(objectId).subscribe((data) => {
      this.answers = this.answers.filter(
        (answer) => answer.objectId !== objectId
      );
      console.log(objectId);
    });
  }

  editAnswerDialog(answer) {
  
    let dialogRef = this.dialog.open(DialogEditComponent, {
      height: '250px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((text) => {

    this.answerService.editAnswers(text, answer.objectId).subscribe((text) => {
      this.answers = this.answers.filter(
        ({ objectId }) => answer.objectId !== objectId
      );
      this.answers = [...this.answers, { objectId: answer.objectId, ...text }];
      
    });
    })
  }
}
