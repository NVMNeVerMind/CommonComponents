import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Pages} from "../../app-routing.module";
import {AuthService} from "../../services/auth/auth.service";
import {NotificationService} from "../../services/notification/notification.service";

@Component({
    selector: 'app-renew-password',
    templateUrl: './renew-password.component.html',
  standalone: false,
    styleUrls: ['./renew-password.component.scss']
})
export class RenewPasswordComponent implements OnInit {
    @Input() styleClass: string = 'teacher';

    private schoolId: string = '';
    private token: string = '';

    password: string = '';
    confirmPassword: string = '';
    protected isLoading: boolean = false;
    protected showPassword: boolean = false;
    protected showConfirmPassword: boolean = false;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly notificationService: NotificationService,
        private readonly cdr: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['s'] && params['t']) {
                this.schoolId = params['s']
                this.token = params['t']
            } else {
                this.router.navigateByUrl('/' + Pages.home);
            }
        });
    }

    private verifyPassword() {
        if (this.password.trim().length <= 5 && this.confirmPassword.trim().length <= 5) {
            this.notificationService.notify('Veuillez entrer un mot de passe de plus de 5 caractères', true);
            return false;
        }
        if (this.password != this.confirmPassword) {
            this.notificationService.notify('Les mots de passe ne correspondent pas', true);
            return false;
        }
        return true;
    }

    renew() {
        if (this.verifyPassword()) {
            this.isLoading = true;
            this.authService.renewPassword(this.schoolId, this.token, {password: this.password}).subscribe({
                next: (renewed) => {
                    if (renewed) {
                        this.notificationService.notify('Mot de passe modifié avec succès')
                        this.router.navigate(['/', Pages.login])
                    } else {
                        this.notificationService.notify('Impossible de modifier votre mot de passe avec le lien fourni', true)
                    }
                    this.cdr.detectChanges();
                },
                error: (error => {
                    this.notificationService.notify(error.error.message, true)
                    this.isLoading = false;
                    this.cdr.detectChanges();
                }),
            });
        }
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }
}
