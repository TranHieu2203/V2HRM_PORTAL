import { Component, Input, Output, OnInit, OnDestroy, ViewEncapsulation, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ISmartTableColumn, ISmartTableInput } from './smart-table-input';

interface ISearchTerm {
  searchTerm: string,
  index: number,
}

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  encapsulation: ViewEncapsulation.None, // To allow external styles to affect the content of component
})
export class SmartTableComponent implements OnInit, OnDestroy, AfterViewInit {
  dtOptions: DataTables.Settings = {};

  @Input() loading!: BehaviorSubject<boolean>;
  @Input() inputData!: BehaviorSubject<ISmartTableInput | null>;
  @Input() selectedItem!: BehaviorSubject<any>;
  @Output() onColumnsChanged = new EventEmitter<ISmartTableColumn[]>();
  @ViewChild('wrapper') wrapper!: ElementRef;

  private searchTerm$ = new Subject<ISearchTerm>();

  wrapperWidth!: number;
  wrapperHeight!: number;
  viewInited: boolean = false;

  inputDataSubscription!: Subscription;

  showCheck: boolean = false;
  showFilter: boolean = false;

  checkboxCellWidth: number = 0;

  columns!: ISmartTableColumn[];
  primaryKey!: string;
  frozenColumnCount: number | undefined = 1;
  cellPadding: string = '4px 5px';
  verticalBorderWidth: number = 0;

  list!: any[];
  totalRow!: number;
  selectedIndex!: number;
  selectedId!: any;

  thStyle(index: number): string | null {
    if (this.frozenColumnCount && index < this.frozenColumnCount) {
      return `
        left: ${index === 0 ? this.verticalBorderWidth + this.checkboxCellWidth : this.columns[index - 1].left! + this.columns[index - 1].width! + this.verticalBorderWidth + this.checkboxCellWidth}px; 
        z-index: 5;
        width: ${this.columns[index].width!}px;
        border-left: ${this.verticalBorderWidth}px solid #ddd;
      `;
    } else {
      return `
        border-left: ${this.verticalBorderWidth}px solid #ddd;
      `;
    }
  }

  thDivStyle(index: number): string | null {
    if (this.frozenColumnCount && index < this.frozenColumnCount) {
      return `
        width: ${this.columns[index].width!}px !important;
        padding: ${this.cellPadding};
        `
    } else {
      return `
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 200px;
      padding: ${this.cellPadding};
    `
    }
  }

  tdStyle(index: number): string | null {
    if (this.frozenColumnCount && index < this.frozenColumnCount) {
      return `
        width: ${this.columns[index].width!}px !important;
        position: sticky !important; 
        left: ${index === 0 ? this.verticalBorderWidth + this.checkboxCellWidth : this.columns[index - 1].left! + this.columns[index - 1].width! + this.verticalBorderWidth + this.checkboxCellWidth}px; 
        z-index: 3;
        border-left: ${this.verticalBorderWidth}px solid #ddd;
        `
    }
    return `
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 200px;
        padding: ${this.cellPadding};
        border-left: ${this.verticalBorderWidth}px solid #ddd;
      `;
  }

  tdDivStyle(index: number): string | null {
    if (this.frozenColumnCount && index < this.frozenColumnCount) {
      return `
        width: ${this.columns[index].width!}px !important;
        padding: ${this.cellPadding};
        `
    }
    return `
    `
  }

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
    };

    if (this.inputData)
      this.inputDataSubscription = this.inputData.subscribe(x => {
        this.columns = x ? x.columns : [];
        this.primaryKey = x ? x.primaryKey : '';
        this.frozenColumnCount = x ? x.frozenColumnCount : 0;
        this.cellPadding = x ? x.cellPadding ? x.cellPadding! : '4px 5px' : '4px 5px';
        this.verticalBorderWidth = x ? x.verticalBorderWidth ? x.verticalBorderWidth! : 0 : 0;
        this.list = x ? (x.data?.result) ? (x.data?.result) : [] : [];
        this.totalRow = x ? ((x.data?.count) ? (x.data?.count) : 0) : 0;
        this.showCheck = x?.showCheck!;
        this.checkboxCellWidth = x?.checkboxCellWidth!;
        this.showFilter = x?.showFilter!;
      })

    this.searchTerm$
      .pipe(
        // nothing happens during typing with interval (between key strokes) less than current value (in ms):
        debounceTime(500),
        // Only emit when the current value is different than the last:
        distinctUntilChanged(),
        /* On each emission the previous inner observable (the result of the function you supplied)
        is cancelled and the new observable is subscribed.
        */
        switchMap(value => {
          return of(value)
        }))
      .subscribe(value => {
        this.columns[value.index].searchTerm = value.searchTerm;
        this.onColumnsChanged.emit(this.columns)
      })


  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.inputDataSubscription.unsubscribe();

  }

  ngAfterViewInit(): void {
    const rect = this.wrapper.nativeElement.getBoundingClientRect();
    // if we update the view immediately, error NG0100 will occure
    // to bypass the error, use setTimeout
    setTimeout(() => {
      this.wrapperHeight = rect.height;
      this.wrapperWidth = rect.width;
      this.viewInited = true;
    }, 0)
  }

  onRowClick(index: number): void {

    const i = this.list[index];
    this.selectedItem.next(i);
    this.selectedIndex = index;

  }

  onHeaderClick(index: number): void {
    const previousSort = this.columns[index].sort;
    if (previousSort === undefined) this.columns.map(x => x.sort = undefined)
    this.columns[index].sort = previousSort === undefined ? 'asc' : previousSort === 'asc' ? 'desc' : undefined;
    this.onColumnsChanged.emit(this.columns);
  }

  search(event: Event, index: number): void {
    this.searchTerm$?.next({
      searchTerm: (event.target as HTMLInputElement).value,
      index,
    })
  }

  onHeaderCheckChanged(event: any) {
    this.list.map(i => i.checkedForUI = event.target.checked)
  }

}
