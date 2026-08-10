import { Directive } from '@angular/core';

@Directive({
	selector: '[hlmBreadcrumbSeparator]',
	standalone: true,
	host: {
		'aria-hidden': 'true',
		'role': 'presentation',
		'class': 'flex items-center [&>*]:flex [&>*]:items-center [&>*]:size-3.5',
	},
})
export class HlmBreadcrumbSeparatorDirective {}
