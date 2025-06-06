import {Component} from '@angular/core';
import {NotificationService} from "../../services/notification/notification.service";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  standalone: false,
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {

  constructor(
      protected notificationService: NotificationService
  ) {
  }

  protected closed() {
    this.notificationService.isEnabled = false;
    this.notificationService.message = '';
  }

}
