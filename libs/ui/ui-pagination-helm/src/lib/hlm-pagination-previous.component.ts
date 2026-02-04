import { Component, computed, input } from '@angular/core';
import { hlm } from '../../../ui-core/src';
import type { ClassValue } from 'clsx';

@Component({
	selector: 'hlm-pagination-previous',
	standalone: true,
	template: `<ng-content />`,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmPaginationPreviousComponent {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm('gap-1 pl-2.5', this.userClass()),
	);
}
