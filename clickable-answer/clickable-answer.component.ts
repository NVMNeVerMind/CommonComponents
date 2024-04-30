import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Response} from '../../services/question/Response';

@Component({
  selector: 'app-clickable-answer',
  templateUrl: './clickable-answer.component.html',
  styleUrls: ['./clickable-answer.component.scss']
})
export class ClickableAnswerComponent {
  @Input() response: string = ""
  @Input() isSelected: boolean = false;
  @Input() isCorrect: boolean | null = null;
}
