import {DialogExampleComponent} from '../dialog-example/dialog-example.component';
import {DataService} from '../data.service';
import {Question} from '../interfaces';

import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from "@angular/router";

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
    this.router.navigateByUrl('/questions/' + question.objectId, { state: { question } });
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
      if (title.trim()) {
        this.questionService.createQuestion(title).subscribe(() => {
          this.getAllQuestions();
        });
      }
    });
  }
}
