export interface Question {
  objectId: string;
  title: string;
  answerId?: string[]
}

export interface Answer {
  objectId: string;
  text: string;
}

