export interface Question {
  objectId: string;
  title: string;
  answerLength: number;
}

export interface Answer {
  objectId: string;
  text: string;
  questionId: string
}

