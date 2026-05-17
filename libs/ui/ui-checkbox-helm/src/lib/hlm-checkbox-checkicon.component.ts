import {Component, computed, inject, input} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideCheck} from '@ng-icons/lucide';
import {BrnCheckbox} from '@spartan-ng/brain/checkbox';
import {hlm} from '@spartan-ng/ui-core';
import {HlmIconDirective} from '@spartan-ng/ui-icon-helm';
import type {ClassValue} from 'clsx';

@Component({
  selector: 'hlm-checkbox-checkicon',
  imports: [NgIcon, HlmIconDirective],
  standalone: true,
  providers: [provideIcons({lucideCheck})],
  host: {
    '[class]': '_computedClass()',
  },
  template: `
    <ng-icon hlm size="sm" [name]="iconName()"/>
  `
})
export class HlmCheckboxCheckIconComponent {
  public readonly userClass = input<ClassValue>('', {alias: 'class'});
  public readonly iconName = input<string>('lucideCheck');
  protected _computedClass = computed(() =>
    hlm(
      'h-4 w-4 leading-none group-data-[state=unchecked]:opacity-0',
      '',
      this.userClass(),
    ),
  );
  private readonly _brnCheckbox = inject(BrnCheckbox);
  protected _checked = this._brnCheckbox?.isChecked;
}
