import { computed, Directive, input } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import type { ClassValue } from 'clsx';

@Directive({
	selector: '[hlmItem]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmItemDirective {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected _computedClass = computed(() =>
		hlm(
			'relative flex cursor-default select-none items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none transition-colors',
			this.userClass(),
		),
	);
}
