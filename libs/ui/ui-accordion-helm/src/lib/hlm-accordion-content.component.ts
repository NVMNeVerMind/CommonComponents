import {ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation} from '@angular/core';
import {BrnAccordionContent} from '@spartan-ng/brain/accordion';
import {hlm} from '@spartan-ng/ui-core';
import type {ClassValue} from 'clsx';

@Component({
	selector: 'hlm-accordion-content',
	template: `
		<div [attr.inert]="_inert()" style="overflow: hidden">
			<p class="pt-1 pb-4">
				<ng-content />
			</p>
		</div>
	`,
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmAccordionContentComponent extends BrnAccordionContent {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() => {
		const gridRows = this.state() === 'open' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]';
		return hlm('text-sm transition-all grid', gridRows, this.userClass());
	});
}
