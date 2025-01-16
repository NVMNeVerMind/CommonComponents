import {Component, Input} from '@angular/core';
import {Theme} from "../theme";

@Component({
  selector: 'app-h2',
  templateUrl: './h2.component.html',
  styleUrls: ['./h2.component.css']
})
export class H2Component {
  @Input() title: string = '';
  @Input() big: boolean = false;
  @Input() styleClass: string = 'teacher';
  @Input() theme: Theme = Theme.Light;

  protected readonly Theme = Theme;
}
