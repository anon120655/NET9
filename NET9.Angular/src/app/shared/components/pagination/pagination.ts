import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pager } from '../../../services/product.service';  // หรือที่ path จริงของ Pager interface

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class Pagination {
  @Input() pager!: Pager;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    return Array
      .from({ length: this.pager.endPage - this.pager.startPage + 1 })
      .map((_, i) => this.pager.startPage + i);
  }

  toFirst() {
    if (this.pager.currentPage > 1) {
      this.pageChange.emit(1);
    }
  }
  toLast() {
    if (this.pager.currentPage < this.pager.totalPages) {
      this.pageChange.emit(this.pager.totalPages);
    }
  }
  toPrevious() {
    if (this.pager.currentPage > 1) {
      this.pageChange.emit(this.pager.currentPage - 1);
    }
  }
  toNext() {
    if (this.pager.currentPage < this.pager.totalPages) {
      this.pageChange.emit(this.pager.currentPage + 1);
    }
  }
}
