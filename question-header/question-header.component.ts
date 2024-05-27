import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-question-header',
  templateUrl: './question-header.component.html',
  styleUrls: ['./question-header.component.css']
})
export class QuestionHeaderComponent {
  @Input() id: number = 1;
  @Input() points: number = 1.0;
  @Input() edit: boolean = false;
  @Output() changeEvent = new EventEmitter<number>;
  value: number = 1;

  change() {
    console.log(this.value);
    this.changeEvent.emit(this.value)
  }
}
