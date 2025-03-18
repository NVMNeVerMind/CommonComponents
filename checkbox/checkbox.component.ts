import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Theme} from "../theme";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  standalone: false,
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent{
  @Input() styleClass: string = '';
  @Input() label: string = '';
  @Output() change = new EventEmitter<boolean>();
  @Input() isChecked: boolean = false;
  @Input() theme: Theme = Theme.Light;

  checked() {
    this.isChecked = !this.isChecked
    this.change.emit(this.isChecked)
  }

  protected readonly Theme = Theme;
}
