import { Directive } from '@angular/core';

@Directive({
	selector: '[hlmBreadcrumb]',
	standalone: true,
	host: {
		'aria-label': 'breadcrumb',
	},
})
export class HlmBreadcrumbDirective {}
