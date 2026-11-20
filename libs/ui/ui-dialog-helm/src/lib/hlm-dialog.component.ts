import {ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation} from '@angular/core';
import {BrnDialog, BrnDialogOverlay, provideBrnDialogDefaultOptions} from '@spartan-ng/brain/dialog';
import {hlmDialogOverlayClass, HlmDialogOverlayDirective} from './hlm-dialog-overlay.directive';

@Component({
    selector: 'hlm-dialog',
    imports: [BrnDialogOverlay, HlmDialogOverlayDirective],
    providers: [
        {
            provide: BrnDialog,
            useExisting: forwardRef(() => HlmDialogComponent),
        },
        provideBrnDialogDefaultOptions({closeDelay: 100}),
    ],
    template: `
		<brn-dialog-overlay hlm />
		<ng-content />
	`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'hlmDialog'
})
export class HlmDialogComponent extends BrnDialog {
    constructor() {
        super();
        // A dialog bound to state="open" opens before the overlay directive applies its class, leaving the backdrop unstyled.
        this.setOverlayClass(hlmDialogOverlayClass);
    }
}
