import {Component} from '@angular/core';
import {Pages} from "../../app-routing.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {NotificationService} from "../../services/notification/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pop-up-cgs',
  standalone: false,
  templateUrl: './pop-up-cgs.component.html',
})
export class PopUpCgsComponent {
  acceptCGSFormGroup: FormGroup = this.emptyFormCGS();
  protected readonly Pages = Pages;

  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly router: Router) {
  }

  emptyFormCGS(): FormGroup {
    return new FormGroup({
      accept: new FormControl(false, [Validators.required, Validators.requiredTrue]),
    });
  }

  reject() {
    this.authService.logout();
  }

  accept() {
    this.authService.acceptCGS().subscribe({
      next: data => {
        this.acceptCGSFormGroup = this.emptyFormCGS();
        this.authService.setIsCgsAccepted();
        this.router.navigate(['/' + Pages.home]);
      }, error: error => {
        this.notificationService.notify('Une erreur est survenue', true);
      }
    })
  }
}
