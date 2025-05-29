import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {provideIcons} from '@ng-icons/core';
import {lucideCheck, lucideChevronsUpDown, lucideSearch} from '@ng-icons/lucide';
import {SelectOption} from "../little-input/select.option";

@Component({
  selector: 'app-dropdown',
  providers: [provideIcons({lucideChevronsUpDown, lucideSearch, lucideCheck})],
  standalone: false,
  template: `
    <div class="flex items-start justify-between gap-4">
      <label class="text-primary-foreground font-bold">{{ label }}</label>
      <div class="flex flex-col items-center gap-2">
        <input (focus)="triggerDropDown()" name="search" [(ngModel)]="searchString" (keyup)="matchString()"
               [placeholder]="label + '…'" aria-label="Example icon-button with a menu" hlmInput
               class="bg-white w-full"/>
        <div *ngIf="isVisible" class="bg-white w-full h-fit rounded p-2">
          <ul>
            <div (click)="changeValue(option)" *ngFor="let option of filteredOptions" hlmBtn variant="ghost"
                 class="w-full cursor-pointer items-start justify-start">
              <li>{{ option.value }}</li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class DropdownComponent implements OnInit {
  @Input() options: SelectOption[] = [];
  @Input() label: string = 'Sélectionner';
  @Input() defaultValue: string = '';
  @Output() valueChange = new EventEmitter<string>();
  protected isVisible = false;
  protected searchString = '';
  protected filteredOptions: SelectOption[] = [];

  ngOnInit(): void {
    this.filteredOptions = this.options;
    if (this.defaultValue != '') {
      const defaultOption = this.options.find(option => option.id === this.defaultValue);
      if (defaultOption) {
        this.setValue(defaultOption);
      }
    }
  }

  triggerDropDown() {
    this.isVisible = !this.isVisible
  }

  changeValue(option: SelectOption) {
    this.setValue(option);
    this.valueChange.emit(option.id)
  }

  protected matchString() {
    if (this.searchString != '') {
      this.filteredOptions = this.options.filter(option => option.value.toLowerCase().includes(this.searchString.toLowerCase()));
    } else {
      this.filteredOptions = this.options;
    }
  }

  protected setValue(option: SelectOption) {
    this.searchString = option.value;
    this.isVisible = false;
  }
}
