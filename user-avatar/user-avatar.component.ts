import {Component, Input} from '@angular/core';

type UserAvatarSize = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<UserAvatarSize, string> = {
	sm: 'h-8 w-8 text-xs',
	md: 'h-10 w-10 text-sm',
	lg: 'h-16 w-16 text-2xl',
};

@Component({
	selector: 'app-user-avatar',
	templateUrl: './user-avatar.component.html',
	standalone: false,
})
export class UserAvatarComponent {
	@Input() fullName: string = '';
	@Input() showBadge: boolean = false;
	@Input() size: UserAvatarSize = 'md';

	get avatarClass(): string {
		return SIZE_CLASSES[this.size];
	}

	get initials(): string {
		if (!this.fullName) return '';
		const parts = this.fullName.trim().split(' ').filter(Boolean);
		if (parts.length >= 2) {
			return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
		}
		if (parts.length === 1) {
			return parts[0].substring(0, 2).toUpperCase();
		}
		return '';
	}
}
