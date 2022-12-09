import { QuestionBase } from "src/app/models/QuestionBase";
import { RadioQuestion } from "src/app/models/QuestionRadio";

export const QUESTIONS: QuestionBase<string>[] = [
  new RadioQuestion({
    label: 'What is a pug?',
    key: 'pug',
    options: [
      {key: 'pug', value: 'pig', label: 'Text1',isCorrect: false, id: 'op1'},
      {key: 'pug', value: 'dog', label: 'Text2',isCorrect: true, id: 'op2'},
      {key: 'pug', value: 'bre', label: 'Text3',isCorrect: false, id: 'op3'}
    ]
  }),
  new RadioQuestion({
    label: 'What is not a pug?',
    key: 'pug2',
    options: [
      {key: 'pug2', value: 'pig12', label: 'Text4',isCorrect: true, id: 'op4'},
      {key: 'pug2', value: 'dog22', label: 'Text5',isCorrect: false, id: 'op5'},
      {key: 'pug2', value: 'brea2', label: 'Text6',isCorrect: false, id: 'op6'}
    ]
  }),
];
