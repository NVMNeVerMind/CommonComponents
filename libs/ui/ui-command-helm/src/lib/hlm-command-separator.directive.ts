import {Directive} from '@angular/core';

@Directive({
	selector: '[brnCommandSeparator][hlm],[hlmCmdSeparator]',
	standalone: true,
	host: {
		class: '[&_hr]:border-border [&[cmdk-hidden="true"]]:hidden',
	},
})
export class HlmCommandSeparatorDirective {}
