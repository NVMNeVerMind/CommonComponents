import {computed, Directive, input} from '@angular/core';
import {hlm} from '@spartan-ng/ui-core';
import {BrnSelectGroup} from '@spartan-ng/brain/select';
import type {ClassValue} from 'clsx';

@Directive({
	selector: '[hlmSelectGroup], hlm-select-group',
	hostDirectives: [BrnSelectGroup],
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmSelectGroupDirective {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() => hlm(this.userClass()));
}
