import { NgModule } from '@angular/core';
import { HlmBreadcrumbDirective } from './lib/hlm-breadcrumb.directive';
import { HlmBreadcrumbListDirective } from './lib/hlm-breadcrumb-list.directive';
import { HlmBreadcrumbItemDirective } from './lib/hlm-breadcrumb-item.directive';
import { HlmBreadcrumbLinkDirective } from './lib/hlm-breadcrumb-link.directive';
import { HlmBreadcrumbPageDirective } from './lib/hlm-breadcrumb-page.directive';
import { HlmBreadcrumbSeparatorDirective } from './lib/hlm-breadcrumb-separator.directive';

export * from './lib/hlm-breadcrumb.directive';
export * from './lib/hlm-breadcrumb-list.directive';
export * from './lib/hlm-breadcrumb-item.directive';
export * from './lib/hlm-breadcrumb-link.directive';
export * from './lib/hlm-breadcrumb-page.directive';
export * from './lib/hlm-breadcrumb-separator.directive';

@NgModule({
	imports: [
		HlmBreadcrumbDirective,
		HlmBreadcrumbListDirective,
		HlmBreadcrumbItemDirective,
		HlmBreadcrumbLinkDirective,
		HlmBreadcrumbPageDirective,
		HlmBreadcrumbSeparatorDirective,
	],
	exports: [
		HlmBreadcrumbDirective,
		HlmBreadcrumbListDirective,
		HlmBreadcrumbItemDirective,
		HlmBreadcrumbLinkDirective,
		HlmBreadcrumbPageDirective,
		HlmBreadcrumbSeparatorDirective,
	],
})
export class HlmBreadcrumbModule {}
