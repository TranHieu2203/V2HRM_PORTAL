import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

import { MccState } from '../mcc-state';

import { ISmartTableInput } from 'src/app/libraries/smart-table/smart-table-input';

@Component({
  selector: 'app-mcc-datatable',
  templateUrl: './mcc-datatable.component.html',
  styleUrls: ['./mcc-datatable.component.css'],
})
export class MccDatatableComponent implements OnInit, OnDestroy {

  firstLoaded: boolean = false;
  dtOptions: DataTables.Settings = {};
  dataToPass = new BehaviorSubject<ISmartTableInput | null>(null);
  data!: ISmartTableInput;

  selectedItem = new BehaviorSubject<any>(null);
  tableDataSubscription!: Subscription;
  selectedItemSubscription!: Subscription;

  loading = new BehaviorSubject<boolean>(false)

  isLoading!: boolean;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public mccState: MccState) { }

  ngOnInit(): void {

    this.tableDataSubscription = this.mccState.tableData.subscribe(x => {
      this.dataToPass.next({
        columns: this.mccState.shownColumns,
        primaryKey: this.mccState.boundField,
        data: x
      })
      this.firstLoaded = true;
    })

    this.mccState.isLoading.subscribe(x => this.isLoading = x);

    this.selectedItemSubscription = this.selectedItem.subscribe(x => {
      if (this.selectedItem.value) {
        this.mccState.selectedItem.next(x);
        this.mccState.isOpen.next(false);
        this.mccState.displayString.next(x[this.mccState.displayField]);
      }
    })

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.tableDataSubscription.unsubscribe();
    this.tableDataSubscription.unsubscribe();
  }
}
