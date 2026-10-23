import {AfterContentChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {SearchInputComponent} from "../search-input/search-input.component";

/**
 * Shared header for list/table pages: icon + total pill on the left, then a
 * projected filter slot, a search box and a checkbox on the right. Every
 * control is optional and hidden when its corresponding input is not
 * provided, so this single component covers everything from the richest
 * header (icon, total, class dropdown, search, checkbox) down to a bare
 * icon + total pill.
 */
@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  standalone: false,
})
export class TableHeaderComponent implements AfterContentChecked {
  @Input() icon: string = '';
  @Input() total: number | null = null;
  @Input() totalLabel: string = '';

  @Input() searchEnabled: boolean = false;
  @Input() searchPlaceholder: string = 'Rechercher...';
  @Output() searchChange = new EventEmitter<string>();

  @Input() checkboxLabel: string = '';
  @Input() checkboxChecked: boolean = false;
  @Output() checkboxChange = new EventEmitter<boolean>();

  @ViewChild('filterSlot') private filterSlot?: ElementRef<HTMLDivElement>;
  @ViewChild('searchInput') private searchInputRef?: SearchInputComponent;

  protected hasFilters: boolean = false;

  /**
   * The dropdown/filter slot is projected via `ng-content` with no dedicated
   * `@Input`, so emptiness can only be detected by inspecting the actual
   * projected DOM after content projection has run.
   */
  ngAfterContentChecked(): void {
    const el = this.filterSlot?.nativeElement;
    if (el) {
      this.hasFilters = el.childNodes.length > 0;
    }
  }

  protected get showCheckbox(): boolean {
    return !!this.checkboxLabel;
  }

  protected onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }

  protected onCheckboxChange(value: boolean): void {
    this.checkboxChecked = value;
    this.checkboxChange.emit(value);
  }

  /** Lets a parent programmatically clear the projected search box, e.g. on page-size change. */
  resetSearch(): void {
    this.searchInputRef?.reset();
  }
}
