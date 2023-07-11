import { HttpHeaders } from "@angular/common/http";

export enum HttpResponseStyleEnum {
    Strandard = 1,
    Core2021 = 2,
}

export interface IHttpResponseStrandard {
    body: any,
    headers: HttpHeaders,
    ok: boolean,
    status: number,
    statusText: string,
    type: number,
    url: string,
}

interface IHttpResponseBodyCore2021 {
    message: string,
    code: string,
    data: any,
}

export interface IHttpResponseCore2021 {
    body: IHttpResponseBodyCore2021,
    headers: HttpHeaders,
    ok: boolean,
    status: number,
    statusText: string,
    type: number,
    url: string,
}