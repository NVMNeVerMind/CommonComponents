import { Directive, computed, input } from '@angular/core';
import { hlm } from '../../../ui-core/src';
import type { ClassValue } from 'clsx';

@Directive({
	selector: '[hlmPaginationLink]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmPaginationLinkDirective {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm('inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors', this.userClass()),
	);
}
