import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { IFormBaseControl } from './form.service';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

  toFormGroup(fields: IFormBaseControl[][]) {
    const group: any = {};

    fields.forEach(row => {
      row.forEach(column => {
        if (!!column.validators) {
          const validatorArr: ValidatorFn[] = []
          column.validators.map(x => {
            validatorArr.push(x.validator)
          });
          group[column.key] = new FormControl(column.value || '', validatorArr,)
        } else {
          group[column.key] = new FormControl(column.value || '')
        }

      });
    });

    return new FormGroup(group);
  }

}
