import {Component, Input} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Credentials} from "../../services/auth/credentials";
import {User} from "../../services/user/user";
import {NotificationService} from "../../services/notification/notification.service";
import {Router} from "@angular/router";
import {Pages} from "../../app-routing.module";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @Input() styleClass: string = 'teacher';
    @Input() navTo: string = '/';
    credentials: Credentials = {
        email: "",
        password: ""
    }
    isLoading = false;

    constructor(
        private readonly authService: AuthService,
        private readonly notification: NotificationService,
        private readonly router: Router,
    ) {
    }

    connect() {
      console.log(this.credentials);
        if (this.credentials.email.trim().length == 0 && this.credentials.password.trim().length <= 5) {
            this.notification.notify('Veuillez entrer un email et un mot de passe valide', true)
            return
        }
        this.isLoading = true;
        this.authService.login(this.credentials).subscribe({
            next: (user: User) => {
                if (user) {
                    this.authService.saveUser(user)
                    this.router.navigate(['/', Pages.home])
                }
            },
            error: (_) => {
                this.notification.notify('Identifiants incorrects', true);
            }
        }).add(() => this.isLoading = false);
    }

    getEmail(email: string) {
        if (email.trim().length > 0) {
            this.credentials.email = email.trim().toLowerCase()
        }
    }

    getPassword(password: string) {
        if (password.trim().length > 5) {
            this.credentials.password = password.trim()
        }
    }

    protected readonly Pages = Pages;
}
