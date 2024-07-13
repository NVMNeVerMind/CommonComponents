import {Component, Input} from '@angular/core';
import {Theme} from "../theme";

@Component({
  selector: 'app-h1',
  templateUrl: './h1.component.html',
  styleUrls: ['./h1.component.css']
})
export class H1Component {
  @Input() title: string = '';
  @Input() big: boolean = false;
  @Input() styleClass: string = 'teacher';
  @Input() theme: Theme = Theme.Light;

  protected readonly Theme = Theme;
}
