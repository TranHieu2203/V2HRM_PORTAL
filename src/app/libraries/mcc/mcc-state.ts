import { BehaviorSubject, Subscription } from 'rxjs'

import { ISmartTableColumn } from '../smart-table/smart-table-input'

export interface ISmartTableData {
  count: number
  result: any[]
}

export class MccState {

  selectedItemSubscription!: Subscription;

    constructor() {
      this.selectedItemSubscription = this.selectedItem.subscribe(x => {
        if (!!x) {
          this.displayString.next(x[this.displayField]);
        } else {
          this.displayString.next('');
        }
      })
    }

    // from input
    placeholder!: string
    searchholder!: string
    form: any
    fieldName!: string
    gridDboName!: string
    readonly: boolean | undefined
    disabled: boolean | undefined
    apiPath!: string
    apiBody!: object
    apiPathGetById!: string
    apiBodyGetById!: object
    boundField!: string
    displayField!: string
    shownColumns!: ISmartTableColumn[]
    listResponseResultProp!: string;
    listResponseCountProp!: string;
    confirmValueBeforeChanges: ((args: any) => boolean) | undefined
    afterValueChanges: ((args: any) => void) | undefined

    // among local state
    tableData = new BehaviorSubject<ISmartTableData | null>(null)
    selectedItem =  new BehaviorSubject<any>(null)
    keyword = new BehaviorSubject<string>('')
    currentPage = new BehaviorSubject<number>(1)
    pageSize = new BehaviorSubject<number>(5)

    //behavor
    isLoading = new BehaviorSubject<boolean>(false)
    isOpen = new BehaviorSubject<boolean>(false)
    displayString = new BehaviorSubject<string>('')

}