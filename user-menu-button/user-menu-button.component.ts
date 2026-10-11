import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-menu-button',
  templateUrl: './user-menu-button.component.html',
  standalone: false,
})
export class UserMenuButtonComponent {
  @Input() fullName: string = '';
  @Input() isMenuOpen: boolean = false;
  @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();
  @Output() logoutClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly router: Router) {}

  onToggleMenu() {
    this.toggleMenu.emit();
  }

  onProfile() {
    this.toggleMenu.emit();
    this.router.navigate(['/profile']);
  }

  onLogout() {
    this.logoutClicked.emit();
  }
}

