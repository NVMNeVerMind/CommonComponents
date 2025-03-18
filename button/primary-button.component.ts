import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Theme} from "../theme";

@Component({
  selector: 'app-button',
  templateUrl: './primary-button.component.html',
  standalone: false,
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent {
  @Input() label: string = '';
  @Input() rounded: boolean = false;
  @Input() primary: boolean = true;
  @Input() styleClass: string = 'teacher';
  @Input() disabled: boolean = false;
  @Input() bigButton: boolean = false;
  @Input() fixed: boolean = false;
  @Input() danger: boolean = false;
  @Output() clickEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() theme: Theme = Theme.Light;


  emit() {
    this.clickEvent.emit(true)
  }

  protected readonly Theme = Theme;
}
