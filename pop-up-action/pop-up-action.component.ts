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
  @Input() ariaLabel: string = '';

  // Defaults to a no-op so omitting [no] (as every current caller does) can no longer
  // throw "no is not a function" when "Refuser" is clicked.
  @Input() no: () => void = () => {};
  @Input() yes!: () => void;

}
