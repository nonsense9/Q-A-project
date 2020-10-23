export interface Question {
  objectId: string;
  title: string;
  answerLength: number;
  upVote: number;
  downVote: number;
}

export interface Answer {
  objectId: string;
  text: string;
  questionId: string;
  questionTitle: string;
  upVote: number;
  downVote: number;
}
