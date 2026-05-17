import {Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectOption} from '../little-input/select.option';

@Component({
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  standalone: false,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchableSelectComponent),
    multi: true,
  }],
})
export class SearchableSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = '';
  @Input() searchable: boolean = false;
  @Input() searchPlaceholder: string = 'Rechercher...';
  @Input() emptyMessage: string = 'Aucun résultat trouvé';
  @Input() showOptionIcon: boolean = false;
  @Input() value: string | null = null;
  @Output() valueChange = new EventEmitter<string | null>();

  protected isOpen: boolean = false;
  protected searchTerm: string = '';
  protected filtered: SelectOption[] = [];
  protected disabled: boolean = false;

  private onChange: (v: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) this.applyFilter();
  }

  get selected(): SelectOption | null {
    return this.options.find(o => o.id === this.value) ?? null;
  }

  protected toggle(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchTerm = '';
      this.applyFilter();
    } else {
      this.onTouched();
    }
  }

  protected close(): void {
    this.isOpen = false;
    this.onTouched();
  }

  protected applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filtered = !term
      ? [...this.options]
      : this.options.filter(o => o.value.toLowerCase().includes(term));
  }

  protected select(option: SelectOption): void {
    this.value = option.id;
    this.onChange(option.id);
    this.valueChange.emit(option.id);
    this.close();
  }

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: (v: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
