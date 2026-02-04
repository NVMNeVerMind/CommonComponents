import {computed, Directive, input} from '@angular/core';
import {provideIcons} from '@ng-icons/core';
import {lucideChevronDown} from '@ng-icons/lucide';
import { hlm } from '@spartan-ng/ui-core';
import {provideHlmIconConfig} from '../../../ui-icon-helm/src';
import type {ClassValue} from 'clsx';

@Directive({
	selector: 'hlm-icon[hlmAccordionIcon], hlm-icon[hlmAccIcon]',
	standalone: true,
	providers: [provideIcons({ lucideChevronDown }), provideHlmIconConfig({ size: 'none' })],
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmAccordionIconDirective {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected _computedClass = computed(() =>
		hlm('inline-block h-4 w-4 transition-transform [animation-duration:200]', this.userClass()),
	);
}
