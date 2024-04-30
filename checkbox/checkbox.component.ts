import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent{
  @Input() label: string = '';
  @Output() change = new EventEmitter<boolean>();
  @Input() isChecked: boolean = false;

  checked() {
    this.isChecked = !this.isChecked
    this.change.emit(this.isChecked)
  }
}
