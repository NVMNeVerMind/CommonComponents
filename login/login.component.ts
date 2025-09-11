import {Component, Input} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Credentials} from "../../services/auth/credentials";
import {User} from "../../services/user/user";
import {NotificationService} from "../../services/notification/notification.service";
import {Router} from "@angular/router";
import {Pages} from "../../app-routing.module";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @Input() styleClass: string = 'teacher';
  @Input() navTo: string = '/';
  credentials: Credentials = {
    email: "",
    password: ""
  }
  showPassword: boolean = false;

  isLoading = false;
  protected readonly Pages = Pages;

  constructor(
    private readonly authService: AuthService,
    private readonly notification: NotificationService,
    private readonly router: Router,
  ) {
  }

  connect() {
    if (this.credentials.email.trim().length == 0 && this.credentials.password.trim().length <= 5) {
      this.notification.notify('Veuillez entrer un email et un mot de passe valide', true)
      return
    }
    this.isLoading = true;
    this.authService.login(this.credentials).subscribe({
      next: async (user: User) => {
        if (user) {
          await this.authService.saveUser(user)
          this.router.navigate(['/', Pages.home])
        }
      },
      error: (_) => {
        this.notification.notify('Identifiants incorrects', true);
      }
    }).add(() => this.isLoading = false);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
