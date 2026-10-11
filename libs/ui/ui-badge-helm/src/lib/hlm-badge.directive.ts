import {computed, Directive, input, signal} from '@angular/core';
import {hlm} from '@spartan-ng/ui-core';
import {cva, type VariantProps} from 'class-variance-authority';
import type {ClassValue} from 'clsx';

export const badgeVariants = cva(
	'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
				secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
				destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
				outline: 'text-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);
export type BadgeVariants = VariantProps<typeof badgeVariants>;

@Directive({
	selector: '[hlmBadge]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmBadgeDirective {
	private readonly _additionalClasses = signal<ClassValue>('');
	public readonly userClass = input<ClassValue>('', {alias: 'class'});
	public readonly variant = input<BadgeVariants['variant']>('default');
	protected readonly _computedClass = computed(() =>
		hlm(badgeVariants({variant: this.variant()}), this.userClass(), this._additionalClasses()),
	);

	setClass(classes: string): void {
		this._additionalClasses.set(classes);
	}
}
