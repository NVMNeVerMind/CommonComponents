import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-question-header',
  templateUrl: './question-header.component.html',
  styleUrls: ['./question-header.component.css']
})
export class QuestionHeaderComponent {
  @Input() id: number = 1;
  @Input() points: number = 0.5;
  @Output() changeEvent = new EventEmitter<number>;
  value: number = 0.5;

  change() {
    this.changeEvent.emit(this.value)
  }
}
