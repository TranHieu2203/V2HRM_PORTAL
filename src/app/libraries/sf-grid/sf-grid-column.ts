export enum eColumnType {
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    date = 'date',
    datetime = 'datetime',
}

export enum eAlign {
    Right = 'Right',
    Left = 'Left',
    Center = 'Center',
}

export interface ISfGridColumn {
    field: string,
    isPrimaryKey?: string;
    headerText: string,
    textAlign: eAlign,
    width: number,
    type?: eColumnType,
    format?: string,
}