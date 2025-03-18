import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  standalone: false,
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {
  @Input() link: any[] | string | null | undefined = '';
  @Input() link_text: string = '';
  @Input() click?: Function;

}
