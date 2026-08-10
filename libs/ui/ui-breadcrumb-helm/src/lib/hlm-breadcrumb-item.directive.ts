import { computed, Directive, input } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import type { ClassValue } from 'clsx';

@Directive({
	selector: '[hlmBreadcrumbItem]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmBreadcrumbItemDirective {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected _computedClass = computed(() =>
		hlm('flex items-center gap-1.5', this.userClass()),
	);
}
