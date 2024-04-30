import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent {
  @Input() value: string = '';
  @Output() changeEvent: EventEmitter<string> = new EventEmitter()
  onChange() {
    this.changeEvent.emit(this.value)
  }
}
