import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent implements OnInit {

  @Input() pageSize!: number;
  @Input() currentPage!: number;
  @Input() pageCount!: number;
  @Input() recordCount!: number;
  @Input() pageSizeOption!: number[];
  @Output() onCurrentPageChanged = new EventEmitter<number>();
  @Output() onPageSizeChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  goFirst() {
    this.currentPage = 1;
    this.onCurrentPageChanged.emit(1);
  }

  goPrevious() {
    this.currentPage = this.currentPage - 1;
    this.onCurrentPageChanged.emit(this.currentPage);
  }

  goNext() {
    this.currentPage = this.currentPage + 1;
    this.onCurrentPageChanged.emit(this.currentPage);
  }

  goLast() {
    this.currentPage = this.pageCount;
    this.onCurrentPageChanged.emit(this.currentPage)
  }

  onPageSizeChange(value: string) {
    this.pageSize = Number(value);
    this.onPageSizeChanged.emit(this.pageSize);
  }

}
