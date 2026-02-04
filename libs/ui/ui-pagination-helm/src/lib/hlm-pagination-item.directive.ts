import { Directive, computed, input } from '@angular/core';
import { hlm } from '../../../ui-core/src';
import type { ClassValue } from 'clsx';

@Directive({
	selector: '[hlmPaginationItem],li[hlmPaginationItem]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmPaginationItemDirective {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm('', this.userClass()),
	);
}
