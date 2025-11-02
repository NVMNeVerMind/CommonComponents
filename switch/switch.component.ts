import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: false,
  templateUrl: './switch.component.html',
})
export class SwitchComponent {
  @Input() checked: boolean = false
  @Input() label: string = ''
  @Output() change = new EventEmitter<boolean>()

  protected switch() {
    this.checked = !this.checked
    this.change.emit(this.checked)
  }
}
