import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit, Renderer2, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

import { MccState } from './mcc-state';
import { IMccInput } from './mcc-input';
import { IFormBaseControl } from '../dynamic-form/form.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mcc',
  templateUrl: './mcc.component.html',
  styleUrls: ['./mcc.component.css'],
  providers: [MccState],
  encapsulation: ViewEncapsulation.None,
})
export class MccComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() control!: IFormBaseControl;
  @Input() inputData!: IMccInput
  @Output() onMccChanged = new EventEmitter<any>()
  @ViewChild('container') container!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;

  listenerFn!: () => void;

  currentPage: number = 1;
  pageSize: number = 5;
  pageSizeOption: number[] = [5, 10, 20, 50, 100];
  pageCount: number = 0;
  keyword: string = '';
  totalRow: number = 0;

  isLoading: boolean = false;

  onCurrentPageChanged = (value: number) => this.mccState.currentPage.next(value);

  onPageSizeChanged = (value: number) => this.mccState.pageSize.next(value);

  rendered: boolean = false;
  popupClass!: string;

  mccStateIsOpenSubscribtion!: Subscription;

  constructor(
    private mccState: MccState,
    private renderer: Renderer2,
    private commonHttpRequestService: CommonHttpRequestService,
  ) { }

  ngAfterViewInit(): void {

    /**
    * This events get called by all clicks on the page
    */
    this.listenerFn = this.renderer.listen('window', 'click', (e: Event) => {
      /*
       * handle click outside
       */
      if (this.container && !this.container.nativeElement.contains(e.target)) {
        if (this.mccState.isOpen.value) this.mccState.isOpen.next(false);
      }
    })

    this.rendered = true;
  }

  ngOnInit(): void {
    const {
      placeholder,
      searchholder,
      form,
      fieldName,
      gridDboName,
      readonly,
      disabled,
      apiPath,
      apiBody,
      apiPathGetById,
      apiBodyGetById,
      boundField,
      displayField,
      shownColumns,
      listResponseResultProp,
      listResponseCountProp,
      confirmValueBeforeChanges,
      afterValueChanges
    } = this.inputData

    this.mccState.placeholder = placeholder;
    this.mccState.searchholder = searchholder;
    this.mccState.form = form;
    this.mccState.fieldName = fieldName;
    this.mccState.gridDboName = gridDboName;
    this.mccState.readonly = readonly;
    this.mccState.disabled = disabled;
    this.mccState.apiPath = apiPath;
    this.mccState.apiBody = apiBody!;
    this.mccState.apiPathGetById = apiPathGetById;
    this.mccState.apiBodyGetById = apiBodyGetById!;
    this.mccState.boundField = boundField;
    this.mccState.displayField = displayField;
    this.mccState.shownColumns = shownColumns;
    this.mccState.listResponseResultProp = listResponseResultProp;
    this.mccState.listResponseCountProp = listResponseCountProp;
    this.mccState.confirmValueBeforeChanges = confirmValueBeforeChanges;
    this.mccState.afterValueChanges = afterValueChanges;

    this.mccState.currentPage.subscribe(() => {
      this.currentPage = this.mccState.currentPage.value;
      this.rendered && this.refreshMcc();
    })

    this.mccState.pageSize.subscribe(() => {
      this.pageSize = this.mccState.pageSize.value;
      this.rendered && this.refreshMcc();
    })

    this.mccState.keyword.subscribe(() => {
      this.keyword = this.mccState.keyword.value;
      this.rendered && this.refreshMcc();
    })

    this.refreshMcc();

    this.initaillySetSelectedItem();

    this.mccStateIsOpenSubscribtion = this.mccState.isOpen.subscribe(x => {
      this.popupClass = this.rendered ? (x ? "being-closed" : "being-opened") : "default";

      if (this.popup) {
        const el = this.popup.nativeElement;
        el.style.animation = 'none';
        el.offsetHeight;  /* trigger reflow */
        el.style.animation = null;
      }
    });

    this.mccState.isLoading.subscribe(x => this.isLoading = x);

    this.mccState.selectedItem?.subscribe((x: any) => {


      if (x) this.onMccChanged.emit({
        fieldName: this.mccState.fieldName,
        value: x[this.mccState.boundField]
      })
    })


  }

  ngOnDestroy(): void {
    this.mccStateIsOpenSubscribtion.unsubscribe();
    if (this.listenerFn) this.listenerFn();
  }

  refreshMcc() {
    this.mccState.isLoading.next(true);

    this.commonHttpRequestService.commonPostRequest('refreshList', this.mccState.apiPath, {
      ...this.mccState.apiBody,
      currentPage: this.mccState.currentPage.value,
      pageSize: this.mccState.pageSize.value,
      keyword: this.mccState.keyword.value,
    })
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          this.mccState.tableData.next({
            result: x.body[this.mccState.listResponseResultProp],
            count: x.body[this.mccState.listResponseCountProp]
          });
          this.totalRow = x.body[this.mccState.listResponseCountProp];
          this.pageCount = Math.ceil(x.body[this.mccState.listResponseCountProp] / this.pageSize);
        }
        this.mccState.isLoading.next(false);
      })
  }

  initaillySetSelectedItem() {
    this.mccState.isLoading.next(true);

    if (!!!this.control.value) {
      this.mccState.selectedItem.next(null);
      this.mccState.isLoading.next(false);
      return;
    }

    this.commonHttpRequestService.commonPostRequest('getDisplayString', this.mccState.apiPathGetById, {
      ...this.mccState.apiBodyGetById,
      id: this.control.value
    })
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          this.mccState.selectedItem.next(x.body[this.mccState.listResponseResultProp]);
        }
        this.mccState.isLoading.next(false);
      })
  }
}
