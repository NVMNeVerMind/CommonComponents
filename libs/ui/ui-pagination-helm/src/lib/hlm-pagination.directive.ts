import { Directive, computed, input } from '@angular/core';
import { hlm } from '../../../ui-core/src';
import type { ClassValue } from 'clsx';

@Directive({
	selector: '[hlmPagination],nav[hlmPagination]',
	standalone: true,
	host: {
		role: 'navigation',
		'[attr.aria-label]': 'ariaLabel()',
		'[class]': '_computedClass()',
	},
})
export class HlmPaginationDirective {
	public readonly ariaLabel = input<string>('pagination');
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm('mx-auto flex w-full justify-center', this.userClass()),
	);
}
