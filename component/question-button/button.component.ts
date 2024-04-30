import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-question-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Output() event: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() little: boolean = false;
  @Input() value: string = '';
  addQuestion() {
    this.event.emit(true);
  }
}
