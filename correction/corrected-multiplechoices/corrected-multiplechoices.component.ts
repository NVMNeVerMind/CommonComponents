import {Component, Input} from '@angular/core';
import {Question} from "../../../services/question/question";

@Component({
  selector: 'app-corrected-multiplechoices',
  templateUrl: './corrected-multiplechoices.component.html',
  styleUrl: './corrected-multiplechoices.component.scss'
})
export class CorrectedMultiplechoicesComponent {
  @Input() selected: string[] = [];
  @Input() question: Question = Question.emptyQuestion();
}
