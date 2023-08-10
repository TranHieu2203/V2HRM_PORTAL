import { Component } from "@angular/core";

export class HrProcessNode {
    label!: string;
    component!: Component;
    status!: boolean;
    employeeName!: string;
    showTab!: boolean;
    nodeId!: number;
}
