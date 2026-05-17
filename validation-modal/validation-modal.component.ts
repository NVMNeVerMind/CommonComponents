import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-validation-modal',
  templateUrl: './validation-modal.component.html',
  standalone: false
})
export class ValidationModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() ctaText: string = 'Confirmer';
  @Input() isWarning: boolean = false;

  @Output() result = new EventEmitter<boolean>();

  confirm(): void {
    this.result.emit(true);
  }

  cancel(): void {
    this.result.emit(false);
  }
}
