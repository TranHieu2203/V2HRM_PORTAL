import { Component, Input, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';

import { DataManager } from '@syncfusion/ej2-data';
import {
  PageSettingsModel,
  SortSettingsModel,
  FilterSettingsModel,
  ToolbarItems,
  SearchSettingsModel,
  SelectionSettingsModel,
  GridComponent,
  RowSelectEventArgs,
  RowDeselectEventArgs,
  GridActionEventArgs,
  EditSettingsModel,
} from '@syncfusion/ej2-angular-grids';
import { L10n, setCulture } from '@syncfusion/ej2-base';

import { SyncfusionService } from 'src/app/services/syncfusion.service';

import { ISfGridColumn } from './sf-grid-column';


setCulture('de-DE');

L10n.load({
  'vi-VI': {
    grid: {
      EmptyRecord: 'Không có bản ghi nào',
      GroupDropArea: 'Ziehen Sie einen Spaltenkopf hier, um die Gruppe ihre Spalte',
      UnGroup: 'Klicken Sie hier, um die Gruppierung aufheben',
      EmptyDataSourceError: 'DataSource darf bei der Erstauslastung nicht leer sein, da Spalten aus der dataSource im AutoGenerate Spaltenraster',
      Item: 'Artikel',
      Items: 'Artikel'
    },
    pager: {
      currentPageInfo: 'Bản ghi từ {0} đến {1}',
      totalItemsInfo: '({0} bản ghi)',
      firstPageTooltip: 'Trang đầu',
      lastPageTooltip: 'Trang cuối',
      nextPageTooltip: 'Trang kế tiếp',
      previousPageTooltip: 'Trang trước',
      nextPagerTooltip: 'Gehen Sie zu den nächsten Pager-Elementen',
      previousPagerTooltip: 'Gehen Sie zu vorherigen Pager-Elementen'
    }
  }
});

@Component({
  selector: 'app-sf-grid',
  templateUrl: './sf-grid.component.html',
  styleUrls: ['./sf-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SfGridComponent implements OnInit, AfterViewInit {

  @ViewChild('grid') grid!: GridComponent;

  @Input() apiListFullUrl!: string;
  @Input() columns!: ISfGridColumn[];
  @Input() sortSettings!: SortSettingsModel;
  @Input() searchSettings!: SearchSettingsModel;
  @Input() editSettings!: EditSettingsModel;
  @Input() toolbar!: ToolbarItems[];

  @Input() persistSelectionMode: boolean = true;
  @Input() height!: number;
  @Input() locale: string = "vi-VI";

  data!: DataManager;
  pageSettings!: PageSettingsModel;
  filterSettings!: FilterSettingsModel;
  toolbarSettings!: ToolbarItems[];
  selectionSettings!: SelectionSettingsModel;
  primaryKey!: string;


  selection: any[] = [];

  constructor(private syncfusionService: SyncfusionService) { }

  ngOnInit(): void {
    this.pageSettings = {
      pageSizes: true,
      pageSize: 10,
    };
    this.filterSettings = {
      type: 'Menu'
    }
    this.toolbarSettings = ['Search'];
    this.selectionSettings = {
      type: 'Multiple',
      mode: "Row",
      persistSelection: false /* at the moment, if persistSelection = true an error will occure when click header checkbox for 'selecting all' [[[[1]]]]*/
    };

    const list = this.columns.filter(x => x.isPrimaryKey === 'true');
    if (list.length) this.primaryKey = list[0].field;

    this.data = this.syncfusionService.makeListManager(this.apiListFullUrl);

  }

  ngAfterViewInit(): void {
    this.grid.selectRows([0, 1, 2]);
  }

  rowSelectionProcess() {
    // If SfGrid persistSelectionMode input is set to false, no action
    if (!this.persistSelectionMode) return;

    // Get the selected rows of current page only. This is OK cause persistSelection is set to false (see [[[[1]]]]).
    const currentPageSelectedRecords: any[] = this.grid.getSelectedRecords();

    if (!!!this.primaryKey) {
      console.log("The persistSelectionMode input property is set to true, but no column has the isPrimaryKey property set to 'true'");
      return;
    }
    const cloneSelection = [...this.selection];
    const currentViewData = this.grid.currentViewData as any[];

    // Remove current page all data rows from cloneSelection
    const cleanSelection = cloneSelection.filter(x => currentViewData.filter(y => y[this.primaryKey] === x[this.primaryKey]).length === 0);

    // Merge selection
    const mergeSelection = [...cleanSelection, ...currentPageSelectedRecords]

    // Get sortSettings
    const sortColumn = this.sortSettings.columns![0];

    // Post-sorting
    mergeSelection.sort((a, b) => {
      if (sortColumn.direction === 'Ascending') {
        if (a[sortColumn.field!] < b[sortColumn.field!]) {
          return -1
        }
        if (a[sortColumn.field!] > b[sortColumn.field!]) {
          return 1
        }
        return 0
      } else {
        if (a[sortColumn.field!] > b[sortColumn.field!]) {
          return -1
        }
        if (a[sortColumn.field!] < b[sortColumn.field!]) {
          return 1
        }
        return 0
      }
    })

    this.selection = mergeSelection;
  }

  rowSelected = (e: RowSelectEventArgs) =>   {
    if (e.isInteracted) this.rowSelectionProcess();
  }
  rowDeselected = (e: RowDeselectEventArgs) => {
    if (e.isInteracted) this.rowSelectionProcess();
  }

  actionBegin = (e: GridActionEventArgs) => {
    console.log(e.requestType, e.type)
  }

  actionComplete = (e: GridActionEventArgs) => {
    console.log(e.requestType, e.type)
    if (e.requestType === 'paging') {
      const selectedIndexes: number[] = [];
      const currentViewData = this.grid.currentViewData as any[];
      currentViewData.map((x, index) => {
        if (this.selection.filter(y => y[this.primaryKey] === x[this.primaryKey]).length) selectedIndexes.push(index);
      })
      this.grid.selectRows(selectedIndexes);
    }
  };

}
