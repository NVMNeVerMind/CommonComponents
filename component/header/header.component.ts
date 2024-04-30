import {Component} from '@angular/core';
import {Pages} from "../../app-routing.module";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    protected readonly authService: AuthService
  ) {
  }

  protected readonly Pages = Pages;
}
