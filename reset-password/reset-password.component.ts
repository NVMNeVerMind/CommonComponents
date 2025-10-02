import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {NotificationService} from "../../services/notification/notification.service";
import {Pages} from "../../app-routing.module";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    standalone: false,
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    @Input() styleClass: string = 'teacher';

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly notificationService: NotificationService) {
    }

    ngOnInit(): void {
    }

    protected email: string = '';
    protected isLoading: boolean = false;

    reset() {
        if (this.email.trim().length == 0) {
            this.notificationService.notify('Veuillez entrer un email valide', true);
        }
        this.isLoading = true;
        this.authService.resetPassword(this.email).subscribe({
            next: (_) => {
                this.notificationService.notify('Un email de réinitialisation de mot de passe vous a été envoyé');
                this.router.navigate(['/' + Pages.landing])
            },
            error: (err) => {
                this.notificationService.notify(err.error.message, true);
                this.isLoading = false;
            }
        });
    }
}
