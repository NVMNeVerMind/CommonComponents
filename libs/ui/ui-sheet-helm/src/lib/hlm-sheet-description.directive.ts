import {computed, Directive, input} from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import {BrnSheetDescription} from '@spartan-ng/brain/sheet';
import type {ClassValue} from 'clsx';

@Directive({
	selector: '[hlmSheetDescription]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	hostDirectives: [BrnSheetDescription],
})
export class HlmSheetDescriptionDirective {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected _computedClass = computed(() => hlm('text-sm text-muted-foreground', this.userClass()));
}
