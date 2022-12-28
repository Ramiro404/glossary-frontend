import { QuestionBase } from "./QuestionBase";

export class CheckboxQuestion extends QuestionBase<string> {
  override controlType = 'checkbox';
}
