import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';

export interface Columns {
  label: string;
  field: string;
}

@Component({
  selector: 'app-generic-table',
  standalone: false,
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {
  @Input() data: any[] = [];
  @Input() columns: Columns[] = [];
  @Input() itemsPerPage: number = 5;
  @Input() currentPage: number = 1;
  @Input() total?: number = undefined; // si défini → pagination serveur

  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  @ContentChild('rowTemplate', {static: false}) rowTemplate: TemplateRef<any> | undefined;

  @Input() addedClass: string = '';

  protected readonly Math = Math;

  get paginatedData() {
    if (this.total !== undefined) {
      return this.data;
    }

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data ? this.data.slice(start, end) : [];
  }

  get totalPages() {
    return Math.ceil((this.total ?? this.data.length) / this.itemsPerPage);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  prevPage() {
    this.setPage(this.currentPage - 1);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }

  onItemsPerPageChange(event: Event) {
    const value = parseInt((event.target as HTMLSelectElement).value, 10);
    this.itemsPerPageChange.emit(value);
    this.pageChange.emit(1); // reset page to 1 on limit change
  }
}
