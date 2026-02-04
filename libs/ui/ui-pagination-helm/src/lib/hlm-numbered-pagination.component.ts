import { Component, computed, input } from '@angular/core';
import { hlm } from '../../../ui-core/src';
import type { ClassValue } from 'clsx';

@Component({
	selector: 'hlm-numbered-pagination',
	standalone: true,
	template: `<ng-content />`,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmNumberedPaginationComponent {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm('flex items-center gap-1', this.userClass()),
	);
}
