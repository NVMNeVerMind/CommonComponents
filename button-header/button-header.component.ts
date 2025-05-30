import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-header',
  templateUrl: './button-header.component.html',
  standalone: false,
  styleUrls: ['./button-header.component.scss']
})
export class ButtonHeaderComponent {
  @Input() value: string = "";
}
