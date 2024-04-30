import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-h1',
  templateUrl: './h1.component.html',
  styleUrls: ['./h1.component.css']
})
export class H1Component {
  @Input() title: string = '';

}
