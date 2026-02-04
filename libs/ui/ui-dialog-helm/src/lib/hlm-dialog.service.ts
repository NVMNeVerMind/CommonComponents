import type {ComponentType} from '@angular/cdk/portal';
import {inject, Injectable, type TemplateRef} from '@angular/core';
import {
    type BrnDialogOptions,
    BrnDialogService,
    cssClassesToArray,
    defaultOptions,
} from '@spartan-ng/brain/dialog';
import {HlmDialogContentComponent} from './hlm-dialog-content.component';
import {hlmDialogOverlayClass} from './hlm-dialog-overlay.directive';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HlmDialogOptions<DialogContext = any> = BrnDialogOptions & {
	contentClass?: string;
	context?: DialogContext;
};

@Injectable({
	providedIn: 'root',
})
export class HlmDialogService {
	private readonly _brnDialogService = inject(BrnDialogService);

	public open(component: ComponentType<unknown> | TemplateRef<unknown>, options?: Partial<HlmDialogOptions>) {
		const mergedOptions = {
			...defaultOptions,
			closeDelay: 100,

			...(options ?? {}),
			backdropClass: cssClassesToArray(`${hlmDialogOverlayClass} ${options?.backdropClass ?? ''}`),
			context: { ...options?.context, $component: component, $dynamicComponentClass: options?.contentClass },
		};

		return this._brnDialogService.open(HlmDialogContentComponent, undefined, mergedOptions.context, mergedOptions);
	}
}
