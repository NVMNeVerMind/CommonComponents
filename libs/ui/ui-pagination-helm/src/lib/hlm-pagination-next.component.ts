import { Component, computed, input } from '@angular/core';
import { hlm } from '../../../ui-core/src';
import type { ClassValue } from 'clsx';

@Component({
	selector: 'hlm-pagination-next',
	standalone: true,
	template: `<ng-content />`,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmPaginationNextComponent {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm('gap-1 pr-2.5', this.userClass()),
	);
}
