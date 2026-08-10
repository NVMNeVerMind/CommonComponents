import { NgModule } from '@angular/core';
import { HlmItemDirective } from './lib/hlm-item.directive';

export { HlmItemDirective };

@NgModule({
	imports: [HlmItemDirective],
	exports: [HlmItemDirective],
})
export class HlmItemModule {}
