import { ISmartTableColumn } from "../smart-table/smart-table-input";
export interface IMccInput {
    placeholder: string,
    searchholder: string,
    form: any;
    fieldName: string;
    gridDboName: string;
    readonly?: boolean;
    disabled?: boolean;
    apiMethod: string,
    apiPath: string;
    apiBody?: object;
    apiPathGetById: string;
    apiBodyGetById?: object;
    boundField: string;
    displayField: string;
    shownColumns: ISmartTableColumn[];
    listResponseResultProp: string;
    listResponseCountProp: string;
    confirmValueBeforeChanges?: (args: any) => boolean;
    afterValueChanges?: (args: any) => void;
}
