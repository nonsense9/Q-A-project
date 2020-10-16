import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { DataService } from '../data.service';
import { Question } from '../interfaces';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  title: string = "Learn about: Angular"
  screen: string = "Question list item"
  questions: Question[] = [];

  constructor(private questionService: DataService, public dialog: MatDialog) {}

  ngOnInit() {
  this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getQuestions().subscribe((questions) => {
      this.questions = questions;
    });
  }
  deleteQuestion(objectId) {
    this.questionService.deleteQuestion(objectId).subscribe((data:Question) => {
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
      if (title) {
        this.questionService.createQuestion(title).subscribe((title:Question) => {
          this.getAllQuestions();
        });
      }
    });
  }
}
