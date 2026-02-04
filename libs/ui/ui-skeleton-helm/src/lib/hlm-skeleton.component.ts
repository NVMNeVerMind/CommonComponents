import {Component, computed, input} from '@angular/core';
import {clsx} from 'clsx';
import type {ClassValue} from 'clsx';

@Component({
  selector: 'hlm-skeleton',
  standalone: true,
  template: '',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmSkeletonComponent {
  public readonly userClass = input<ClassValue>('', {alias: 'class'});
  protected _computedClass = computed(() => clsx('block animate-pulse rounded-md bg-muted', this.userClass()));
}
