import { DataService } from './../data.service';
import { Question } from '../interfaces';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questions: Question[] = []
  
  constructor(
    private questionService: DataService
    ) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe((questions) => {
      this.questions = questions
    })
  }

  createQuestion() {
    const title: {title: string} = {title: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}
    
    this.questionService.createQuestion(title).subscribe((data) => {
      this.questions = [...this.questions, {...data, ...title, answerId: [] }]
    })
  }

  deleteQuestion(objectId) {
    this.questionService.deleteQuestion(objectId).subscribe(data => {
      this.questions = this.questions.filter((question) => question.objectId !== objectId)
    })
  }
}

