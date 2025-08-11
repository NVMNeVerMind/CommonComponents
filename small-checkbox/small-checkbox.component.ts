import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-small-checkbox',
  templateUrl: './small-checkbox.component.html',
  standalone: false
})
export class SmallCheckboxComponent {
  @Input() isChecked: boolean = false;
  @Input() label: string = '';
  @Output() change = new EventEmitter<boolean>();

  protected switch() {
    this.isChecked = !this.isChecked;
    this.change.emit(this.isChecked);
  }
}
