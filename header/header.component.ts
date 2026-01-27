import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {Pages} from "../../app-routing.module";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: false,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() styleClass: string = '';

  constructor(
    protected readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  protected readonly Pages = Pages;

  logout() {
    this.authService.disconnect().subscribe({
      next: () => {
        this.authService.logout()
        this.cdr.detectChanges();
      },
      error: () => {
        this.authService.logout()
        this.cdr.detectChanges();
      }
    })
  }

  landing() {
    this.router.navigateByUrl('/' + Pages.landing)
  }
}
