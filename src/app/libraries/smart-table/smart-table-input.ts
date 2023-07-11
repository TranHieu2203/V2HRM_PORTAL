import { ISmartTableData } from "../mcc/mcc-state";

export interface ISmartTableColumn {
    header: string,
    accessor: string,
    type?: string,
    left?: number,
    width?: number,
    sort?: string,
    searchTerm?: string;
}
export interface ISmartTableInput {
    columns: ISmartTableColumn[];
    primaryKey: string;
    data: ISmartTableData | null;
    frozenColumnCount?: number;
    cellPadding?: string;
    verticalBorderWidth?: number,
    showCheck?: boolean,
    checkboxCellWidth?: number,
    showFilter?: boolean,
}