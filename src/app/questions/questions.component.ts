import { DialogExampleComponent } from './../dialog-example/dialog-example.component';
import { DataService } from './../data.service';
import { Question } from '../interfaces';

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];

  constructor(private questionService: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.questionService.getQuestions().subscribe((questions) => {
      this.questions = questions;
    });
  }

  // const title: {title: string} = {title: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}

  // this.questionService.createQuestion(title).subscribe((data) => {
  //   this.questions = [...this.questions, { ...data, answerId: [] }];
  // });

  deleteQuestion(objectId) {
    this.questionService.deleteQuestion(objectId).subscribe((data) => {
      this.questions = this.questions.filter(
        (question) => question.objectId !== objectId
      );
    });
  }

  createQuestionDialog() {
    let dialogRef = this.dialog.open(DialogExampleComponent, {
      height: '200px',
      
    });

    dialogRef.afterClosed().subscribe((title) => {
      this.questionService.createQuestion(title).subscribe((title) => {
        this.questions = [
          ...this.questions,
          {  ...title, answerId: [] }
        ];
      });
    });
  }
}