import {computed, Directive, input} from '@angular/core';
import {hlm} from '@spartan-ng/ui-core';
import type {ClassValue} from 'clsx';

@Directive({
	selector: '[hlmAvatar],brn-avatar[hlm]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmAvatarDirective {
	public readonly userClass = input<ClassValue>('', {alias: 'class'});
	protected readonly _computedClass = computed(() =>
		hlm('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', this.userClass()),
	);
}
