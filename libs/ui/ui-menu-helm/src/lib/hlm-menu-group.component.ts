import {Component} from '@angular/core';
import {CdkMenuGroup} from '@angular/cdk/menu';

@Component({
	selector: 'hlm-menu-group',
	standalone: true,
	host: {
		class: 'block',
	},
	hostDirectives: [CdkMenuGroup],
	template: `
		<ng-content />
	`,
})
export class HlmMenuGroupComponent {}
