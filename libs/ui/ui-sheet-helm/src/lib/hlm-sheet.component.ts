import {ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation} from '@angular/core';
import {BrnDialog, provideBrnDialogDefaultOptions} from '@spartan-ng/brain/dialog';
import {BrnSheet, BrnSheetOverlay} from '@spartan-ng/brain/sheet';
import {HlmSheetOverlayDirective} from './hlm-sheet-overlay.directive';

@Component({
    selector: 'hlm-sheet',
    imports: [BrnSheetOverlay, HlmSheetOverlayDirective],
    providers: [
        {
            provide: BrnDialog,
            useExisting: forwardRef(() => BrnSheet),
        },
        {
            provide: BrnSheet,
            useExisting: forwardRef(() => HlmSheetComponent),
        },
        provideBrnDialogDefaultOptions({closeDelay: 100}),
    ],
    template: `
		<brn-sheet-overlay hlm />
		<ng-content />
	`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'hlmSheet'
})
export class HlmSheetComponent extends BrnSheet {
}
