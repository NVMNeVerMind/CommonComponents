import {NgModule} from '@angular/core';
import {HlmAvatarFallbackDirective} from './lib/hlm-avatar-fallback.directive';
import {HlmAvatarImageDirective} from './lib/hlm-avatar-image.directive';
import {HlmAvatarDirective} from './lib/hlm-avatar.directive';

export * from './lib/hlm-avatar-fallback.directive';
export * from './lib/hlm-avatar-image.directive';
export * from './lib/hlm-avatar.directive';

export const HlmAvatarImports = [HlmAvatarDirective, HlmAvatarImageDirective, HlmAvatarFallbackDirective] as const;

@NgModule({
	imports: [...HlmAvatarImports],
	exports: [...HlmAvatarImports],
})
export class HlmAvatarModule {}
