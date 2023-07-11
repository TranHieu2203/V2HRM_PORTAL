import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ValidatorFn } from '@angular/forms';

import { ControlBase } from './control-base';
import { Dropdown } from './dropdown';
import { Textbox } from './textbox';

import { IMccInput } from '../mcc/mcc-input';

export enum EnumFormBaseContolType {
  Textbox = 0,
  Dropdown = 1,
  Mcc = 2,
}

interface IFormBaseDropdownOption {
  key: string,
  value: string,
}

interface IValidator {
  name: string, // must equal the error key
  validator: ValidatorFn,
  errorMessage: string,
}

export interface IFormBaseControl {
  flexSize: number;
  controlType: EnumFormBaseContolType,
  key: string,
  label: string,
  value: any,
  options?: IFormBaseDropdownOption[],
  readonly?: boolean,
  type?: string,
  mccData?: IMccInput,
  validators?: IValidator[],
  onMccChanged?: (args: any) => void
}

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

    // TODO: get from a remote source of question metadata
    getForm(controls: IFormBaseControl[]): Observable<ControlBase<string>[]> {

      const fiels: ControlBase<string>[] = [];

      controls.map(control => {
        switch (control.controlType) {
          case EnumFormBaseContolType.Dropdown:
            fiels.push(new Dropdown(control))
            break;

          default:
            fiels.push(new Textbox(control))
        }
      })

      return of(fiels.sort((a, b) => a.order - b.order));

    }

  }
