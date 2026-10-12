import {computed, Directive, input} from '@angular/core';
import {hlm} from '@spartan-ng/ui-core';
import type {ClassValue} from 'clsx';

@Directive({
	selector: '[hlmAvatarImage],img[brnAvatarImage][hlm]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmAvatarImageDirective {
	public readonly userClass = input<ClassValue>('', {alias: 'class'});
	protected readonly _computedClass = computed(() =>
		hlm('aspect-square h-full w-full object-cover', this.userClass()),
	);
}
