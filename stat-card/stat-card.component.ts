import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  standalone: false,
})
export class StatCardComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() iconClass: string = 'text-primary';
}
