// export interface IQuestion {
//   id: number,
//   label: string,
//   name: string,
//   value: string,
//   answers: IAnswer,
// }

export interface IQuestion {
  id: number,
  question: string,
  control: 'checkbox' | 'radio',
  answers: IAnswer[]
}
export interface IAnswer{
  id: number,
  answer: string,
  isCorrect: boolean,
  isSelected: boolean
}
