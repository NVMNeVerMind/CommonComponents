import {Component} from '@angular/core';
import {Pages} from "../../app-routing.module";

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  protected readonly Pages = Pages;
}
