import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: false,
})
export class ProfileComponent implements OnInit {
  fullName: string = '';
  email: string = '';

  // Password change form
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.fullName = this.authService.getFullName();
    this.email = this.authService.getEmail();
  }

  toggleCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  validateForm(): boolean {
    this.clearMessages();

    if (!this.currentPassword) {
      this.errorMessage = 'Veuillez entrer votre mot de passe actuel';
      return false;
    }

    if (!this.newPassword) {
      this.errorMessage = 'Veuillez entrer un nouveau mot de passe';
      return false;
    }

    if (this.newPassword.length < 8) {
      this.errorMessage = 'Le nouveau mot de passe doit contenir au moins 8 caractères';
      return false;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return false;
    }

    if (this.currentPassword === this.newPassword) {
      this.errorMessage = 'Le nouveau mot de passe doit être différent de l\'ancien';
      return false;
    }

    return true;
  }

  changePassword() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    this.authService.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Mot de passe modifié avec succès';
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (error: { status: number }) => {
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage = 'Mot de passe actuel incorrect';
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}

