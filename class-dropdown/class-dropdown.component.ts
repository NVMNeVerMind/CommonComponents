import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SelectOption} from "../little-input/select.option";

@Component({
  selector: 'app-class-dropdown',
  templateUrl: './class-dropdown.component.html',
  standalone: false
})
export class ClassDropdownComponent implements OnInit, OnChanges {
  @Input() yearlyClasses: SelectOption[] = [];
  @Input() selectedYearlyClass: SelectOption | null = null;
  @Input() disabled: boolean = false;
  @Output() classSelected = new EventEmitter<SelectOption>();
  @Output() disabledClick = new EventEmitter<void>();

  protected isDropdownOpen: boolean = false;
  protected classSearchTerm: string = '';
  protected filteredYearlyClass: SelectOption[] = [];

  ngOnInit(): void {
    this.filterYearlyClasses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // A single available option is picked for the caller rather than left
    // for a click that has no real choice behind it. Only fires when
    // nothing is selected yet, so it never overrides an explicit selection
    // (including one the caller cleared on purpose).
    if (changes['yearlyClasses'] && !this.selectedYearlyClass && this.yearlyClasses.length === 1) {
      this.selectClass(this.yearlyClasses[0]);
    }
  }

  toggleDropdown(): void {
    if (this.disabled) {
      this.disabledClick.emit();
      return;
    }
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.classSearchTerm = '';
      this.filterYearlyClasses();
    }
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
    this.classSearchTerm = '';
  }

  filterYearlyClasses(): void {
    if (!this.classSearchTerm.trim()) {
      this.filteredYearlyClass = [...this.yearlyClasses];
    } else {
      const term = this.classSearchTerm.toLowerCase();
      this.filteredYearlyClass = this.yearlyClasses.filter(c =>
        c.value.toLowerCase().includes(term)
      );
    }
  }

  selectClass(cls: SelectOption): void {
    this.selectedYearlyClass = cls;
    this.closeDropdown();
    this.classSelected.emit(cls);
  }
}

