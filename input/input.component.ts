import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Theme} from "../theme";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone: false,
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() max: number = 180;
  @Input() min: number = 0;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = '';
  @Input() value: string = '';
  @Input() isSuffix: boolean = false;
  @Input() large: boolean = false;

  @Output() change = new EventEmitter<string>();
  @Input() theme: Theme = Theme.Light;

  onChange() {
    this.change.emit(this.value)
  }

  protected readonly Theme = Theme;
}
