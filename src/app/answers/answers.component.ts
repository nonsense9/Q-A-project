import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

import { DataService } from './../data.service';
import { Answer } from '../interfaces';

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
    const text: { text: string } = {
      text:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    };

    this.answerService.createAnswer(text).subscribe((data) => {
      console.log(data);

      this.answers = [...this.answers, { ...data, ...text }];
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

  editAnswer(answer) {
    const text: { text: string } = {
      text:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    };

    this.answerService.editAnswers(text, answer.objectId).subscribe((data) => {
      this.answers = this.answers.filter(
        ({ objectId }) => answer.objectId !== objectId
      );
      this.answers = [...this.answers, { objectId: answer.objectId, ...text }];
    });
  }
}
