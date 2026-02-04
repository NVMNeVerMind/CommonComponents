import {ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation} from '@angular/core';
import {BrnDialog, BrnDialogOverlay} from '@spartan-ng/brain/dialog';
import {HlmDialogOverlayDirective} from './hlm-dialog-overlay.directive';

@Component({
	selector: 'hlm-dialog',
	standalone: true,
  imports: [BrnDialogOverlay, HlmDialogOverlayDirective],
	providers: [
		{
			provide: BrnDialog,
			useExisting: forwardRef(() => HlmDialogComponent),
		},
	],
	template: `
		<brn-dialog-overlay hlm />
		<ng-content />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	exportAs: 'hlmDialog',
})
export class HlmDialogComponent extends BrnDialog {
	constructor() {
		super();
	}
}
