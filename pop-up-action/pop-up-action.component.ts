import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pop-up-action',
  templateUrl: './pop-up-action.component.html',
})
export class PopUpActionComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() iconName: string = '';

  @Input() no!: () => void;
  @Input() yes!: (...args: any[]) => void;

}
