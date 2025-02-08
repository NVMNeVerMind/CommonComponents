import {Component, ContentChild, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
})
export class GenericTableComponent {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;

  @ContentChild('rowTemplate', {static: false}) rowTemplate: TemplateRef<any> | undefined;
  protected readonly Math = Math;

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  prevPage() {
    this.setPage(this.currentPage - 1);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }
}
