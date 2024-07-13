import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectOption} from "./select.option";
import {Theme} from "../theme";

@Component({
  selector: 'app-little-input',
  templateUrl: './little-input.component.html',
  styleUrls: ['./little-input.component.css']
})
export class LittleInputComponent {
  @Input() max: number = 180;
  @Input() min: number | string = 0;
  @Input() label: string = '';
  @Input() placeHolder: string = '';
  @Input() type: string = '';
  @Input() isSelect: boolean = false;
  @Input() selectedOption: SelectOption[] = []
  @Input() isSuffix: boolean = false;
  @Input() veryLittle: boolean = false;
  @Input() suffix: string = '';
  @Input() theme: Theme = Theme.Light;

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Input() firstValue: string | number = '';

  @Input() value: string | number = '';

  onChange(){
    if(this.isSelect && this.value != this.firstValue) {
      this.change.emit(this.value)
    }
    else if(!this.isSelect) this.change.emit(this.value)
  }

  protected readonly Theme = Theme;
}
