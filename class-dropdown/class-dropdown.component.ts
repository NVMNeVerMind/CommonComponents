import {Component, EventEmitter, Input, Output, OnInit, DoCheck} from '@angular/core';
import {SelectOption} from "../little-input/select.option";

@Component({
  selector: 'app-class-dropdown',
  templateUrl: './class-dropdown.component.html',
  standalone: false
})
export class ClassDropdownComponent implements OnInit, DoCheck {
  @Input() yearlyClasses: SelectOption[] = [];
  @Input() selectedYearlyClass: SelectOption | null = null;
  @Input() disabled: boolean = false;
  @Output() classSelected = new EventEmitter<SelectOption>();
  @Output() disabledClick = new EventEmitter<void>();

  protected isDropdownOpen: boolean = false;
  protected classSearchTerm: string = '';
  protected filteredYearlyClass: SelectOption[] = [];

  /**
   * Id of the option we already auto-selected. Guards against emitting twice for
   * the same option, since the check below runs on every change detection pass.
   */
  private autoSelectedOptionId: string | null = null;

  ngOnInit(): void {
    this.filterYearlyClasses();
  }

  /**
   * `ngDoCheck` rather than `ngOnChanges`: several parents fill `yearlyClasses`
   * by pushing into the existing array once their HTTP call resolves, so the
   * array reference never changes and `ngOnChanges` would not fire again. The
   * check below is O(1) and guarded, so running it on every pass is cheap.
   */
  ngDoCheck(): void {
    this.preselectSingleOption();
  }

  /**
   * When exactly one class is available, select it as if the user had clicked it
   * so parents receive the selection without any interaction.
   *
   * The emission is deferred to a microtask on purpose. `ngDoCheck` runs inside
   * change detection, and every parent binds `selectedYearlyClass` to a field or
   * getter that it updates from the `classSelected` handler. Emitting
   * synchronously would change those bindings after they had already been
   * checked, which throws ExpressionChangedAfterItHasBeenCheckedError (NG0100) in
   * dev mode. Deferring lets the current pass finish first.
   */
  private preselectSingleOption(): void {
    if (!this.yearlyClasses || this.yearlyClasses.length !== 1) {
      this.autoSelectedOptionId = null;
      return;
    }

    const onlyOption = this.yearlyClasses[0];

    // Never override a selection the parent already provided.
    if (this.selectedYearlyClass || this.autoSelectedOptionId === onlyOption.id) {
      return;
    }
    this.autoSelectedOptionId = onlyOption.id;

    Promise.resolve().then(() => {
      // Re-check: the parent may have supplied a selection, or the list may have
      // changed again, between scheduling and running this microtask.
      if (this.selectedYearlyClass || this.yearlyClasses?.length !== 1 || this.yearlyClasses[0].id !== onlyOption.id) {
        return;
      }
      this.selectedYearlyClass = onlyOption;
      this.classSelected.emit(onlyOption);
    });
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

