import {Component, Input} from '@angular/core';
import {NotificationService} from "../../services/notification/notification.service";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {
  constructor(
      private notificationService: NotificationService
  ) {
  }
  @Input() message: string = '';
  // @ts-ignore
  @Input() function: (...args: any) => void;
}
