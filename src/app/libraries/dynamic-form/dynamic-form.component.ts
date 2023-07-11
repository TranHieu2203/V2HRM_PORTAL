import { Component, Input, Output, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { FormControlService } from './form-control.service';

import { IFormBaseControl } from './form.service';

export interface IDynamicFormEmitOnFormCreated {
  formName: string,
  formGroup: FormGroup,
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ FormControlService ],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicFormComponent implements OnInit {

  @Input() formName!: string;
  @Input() submitText!: string;
  @Input() controls!: BehaviorSubject<IFormBaseControl[][]>;
  @Output() onFormCreated = new EventEmitter<IDynamicFormEmitOnFormCreated>()
  @Output() onSubmit = new EventEmitter<any>()
  form = new BehaviorSubject<FormGroup>(new FormGroup([ new FormControl() ]));
  payLoad = '';

  constructor(private fcs: FormControlService) {}

  ngOnInit() {

    this.controls.subscribe(x => {
      this.form.next(this.fcs.toFormGroup(x as IFormBaseControl[][]));

      this.onFormCreated.emit({
        formName: this.formName,
        formGroup: this.form.value
      });

    });
    
  }

  onFormSubmit() {
    this.payLoad = JSON.stringify(this.form.value.getRawValue());
    this.onSubmit.emit(this.form.value.getRawValue());
  }
}