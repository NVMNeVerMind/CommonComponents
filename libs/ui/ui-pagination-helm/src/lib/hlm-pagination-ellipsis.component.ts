import { Component, computed, input } from '@angular/core';
import { hlm } from '../../../ui-core/src';
import type { ClassValue } from 'clsx';

@Component({
	selector: 'hlm-pagination-ellipsis',
	standalone: true,
	template: `<span>...</span>`,
	host: {
		'aria-hidden': 'true',
		'[class]': '_computedClass()',
	},
})
export class HlmPaginationEllipsisComponent {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm('flex h-9 w-9 items-center justify-center', this.userClass()),
	);
}
