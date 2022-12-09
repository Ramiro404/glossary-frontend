export interface IQuestion {
  id: number,
  label: string,
  name: string,
  value: string,
  answers: Answer,
}

export interface Answer extends IQuestion {
  isCorrect: boolean
}
