import {computed, Directive, input} from '@angular/core';
import {hlm} from '@spartan-ng/ui-core';
import type {ClassValue} from 'clsx';

@Directive({
	selector: '[hlmAvatarFallback],[brnAvatarFallback][hlm]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmAvatarFallbackDirective {
	public readonly userClass = input<ClassValue>('', {alias: 'class'});
	protected readonly _computedClass = computed(() =>
		hlm(
			'flex h-full w-full items-center justify-center rounded-full bg-secondary text-secondary-foreground font-medium',
			this.userClass(),
		),
	);
}
