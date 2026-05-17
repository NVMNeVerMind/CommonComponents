import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {SelectOption} from "../little-input/select.option";

@Component({
  selector: 'app-class-dropdown',
  templateUrl: './class-dropdown.component.html',
  standalone: false
})
export class ClassDropdownComponent implements OnInit {
  @Input() yearlyClasses: SelectOption[] = [];
  @Input() selectedYearlyClass: SelectOption | null = null;
  @Output() classSelected = new EventEmitter<SelectOption>();

  protected isDropdownOpen: boolean = false;
  protected classSearchTerm: string = '';
  protected filteredYearlyClass: SelectOption[] = [];

  ngOnInit(): void {
    this.filterYearlyClasses();
  }

  toggleDropdown(): void {
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

