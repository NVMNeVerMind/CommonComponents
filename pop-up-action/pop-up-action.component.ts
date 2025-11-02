import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pop-up-action',
  standalone: false,
  templateUrl: './pop-up-action.component.html',
})
export class PopUpActionComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() iconName: string = '';
  @Input() accept: string = 'Valider';
  @Input() refuse: string = 'Refuser';

  @Input() no!: () => void;
  @Input() yes!: (...args: any[]) => void;

}
