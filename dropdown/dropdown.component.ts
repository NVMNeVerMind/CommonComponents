import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {provideIcons} from '@ng-icons/core';
import {lucideCheck, lucideChevronsUpDown, lucideSearch} from '@ng-icons/lucide';
import {SelectOption} from "../little-input/select.option";

@Component({
  selector: 'app-dropdown',
  providers: [provideIcons({lucideChevronsUpDown, lucideSearch, lucideCheck})],
  standalone: false,
  template: `
    <div class="relative">
      <button type="button" (click)="toggleDropdown()"
              class="w-full flex items-center justify-between gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-left hover:border-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              [class.ring-2]="isVisible" [class.ring-primary]="isVisible" [class.border-primary]="isVisible">
        <span [class.text-gray-400]="!selectedOption" class="text-sm truncate">
          {{ selectedOption?.value || label + '…' }}
        </span>
        <ng-icon hlm size="sm" name="lucideChevronsUpDown"
                 class="text-gray-500 flex-none transition-transform duration-200"
                 [class.rotate-180]="isVisible"></ng-icon>
      </button>

      <div *ngIf="isVisible"
           class="absolute z-50 min-w-full w-max max-w-sm mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div class="p-2 border-b border-gray-100">
          <div class="relative">
            <ng-icon hlm size="sm" name="lucideSearch"
                     class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"></ng-icon>
            <input name="search" [(ngModel)]="searchString" (keyup)="matchString()" (click)="$event.stopPropagation()"
                   [placeholder]="label + '…'" hlmInput
                   class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white"/>
          </div>
        </div>

        <div class="max-h-48 overflow-y-auto">
          <div *ngIf="filteredOptions.length === 0" class="px-4 py-6 text-center text-gray-400">
            <p class="text-sm">Aucun résultat</p>
          </div>
          <button *ngFor="let option of filteredOptions" type="button" (click)="changeValue(option)"
                  class="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors whitespace-nowrap"
                  [class.text-primary]="selectedOption?.id === option.id">
            <span class="text-sm font-medium">{{ option.value }}</span>
            <ng-icon *ngIf="selectedOption?.id === option.id" hlm size="sm" name="lucideCheck"
                     class="ml-auto text-primary"></ng-icon>
          </button>
        </div>
      </div>

      <div *ngIf="isVisible" class="fixed inset-0 z-40" (click)="closeDropdown()"></div>
    </div>
  `,
})
export class DropdownComponent implements OnInit, OnChanges {
  @Input() options: SelectOption[] = [];
  @Input() label: string = 'Sélectionner';
  @Input() defaultValue: string = '';
  @Output() valueChange = new EventEmitter<string>();
  protected isVisible = false;
  protected searchString = '';
  protected filteredOptions: SelectOption[] = [];
  protected selectedOption: SelectOption | null = null;

  ngOnInit(): void {
    this.refreshOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['defaultValue']) {
      this.refreshOptions();
    }
  }

  private refreshOptions(): void {
    this.matchString();
    if (this.defaultValue != '') {
      const defaultOption = this.options.find(option => option.id === this.defaultValue);
      if (defaultOption) {
        this.setValue(defaultOption);
      }
    }
  }

  toggleDropdown() {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.searchString = '';
      this.matchString();
    }
  }

  closeDropdown(): void {
    this.isVisible = false;
    this.searchString = '';
    this.matchString();
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
    this.selectedOption = option;
    this.closeDropdown();
  }
}
