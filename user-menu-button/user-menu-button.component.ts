import {Component, EventEmitter, Input, Output} from '@angular/core';

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

  getUserInitials(): string {
    if (!this.fullName) return '';
    const parts = this.fullName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return this.fullName.substring(0, 2).toUpperCase();
  }

  onToggleMenu() {
    this.toggleMenu.emit();
  }

  onLogout() {
    this.logoutClicked.emit();
  }
}

