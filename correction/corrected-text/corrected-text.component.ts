import {Component, Input} from '@angular/core';
import {QuestionTypes} from "../../../services/question/question.types";

@Component({
  selector: 'app-corrected-text',
  templateUrl: './corrected-text.component.html',
  styleUrl: './corrected-text.component.scss'
})
export class CorrectedTextComponent {
  @Input() standardAnswer: string = '';
  @Input() answer: string = '';
  @Input() isCorrect: boolean = false;
}
