import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent {
  @Input() label: string = '';
  @Input() primary: boolean = true;
  @Input() styleClass: string = '';
  @Input() disabled: boolean = false;

  @Output() clickEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() bigButton: boolean  = false;
  emit() {
    this.clickEvent.emit(true)
  }
}
