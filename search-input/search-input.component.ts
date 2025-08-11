import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Theme} from "../theme";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  standalone: false,
})
export class SearchInputComponent {
  @Input() placeholder: string = 'Rechercher…';
  @Input() theme: Theme = Theme.Dark;
  @Output() change = new EventEmitter<string>();
  protected value: string = '';

  filterChangeValue() {
    console.log(this.value);
    this.change.emit(this.value);
  }

  log() {
    console.log(this.value)
  }
}
