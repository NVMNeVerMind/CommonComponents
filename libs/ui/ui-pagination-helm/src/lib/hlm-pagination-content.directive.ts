import { Directive, computed, input } from '@angular/core';
import { hlm } from '../../../ui-core/src';
import type { ClassValue } from 'clsx';

@Directive({
	selector: '[hlmPaginationContent],ul[hlmPaginationContent]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmPaginationContentDirective {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm('flex flex-row items-center gap-1', this.userClass()),
	);
}
