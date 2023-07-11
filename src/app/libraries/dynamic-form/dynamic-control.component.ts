import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

import { IFormBaseControl } from './form.service';

interface IError {
  key: string,
  errorMessage: string
}

@Component({
  selector: 'app-dynamic-control',
  templateUrl: './dynamic-control.component.html',
  styleUrls: ['./dynamic-control.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicControlComponent implements OnInit, OnDestroy {

  @Input() control!: IFormBaseControl;
  @Input() form!: BehaviorSubject<FormGroup>;

  rawControl!: AbstractControl | null;
  controlType!: number;
  required!: boolean;
  statusChangesSubscription!: Subscription | undefined;
  errors: IError[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.controlType = this.control.controlType;

    this.required = !!this.control.validators?.filter(x => x.validator.name === 'required').length

    this.form.subscribe(() => {

      this.rawControl = this.form.value.get(this.control.key)

      this.statusChangesSubscription = this.rawControl?.statusChanges.subscribe(() => {

        if (this.form.value.controls[this.control.key].errors) {

          const newErrors: IError[] = [];

          Object.keys(this.form.value.controls[this.control.key].errors!).forEach(key => {

            // tannv:
            // By custom design, custom error is an array
            // while built-in validator should produce an object error if any

            if (this.form.value.controls[this.control.key].errors![key] instanceof Array) {
              newErrors.push({
                key: key,
                errorMessage: this.form.value.controls[this.control.key].errors![key][1]
              })
            } else {
              newErrors.push({
                key: key,
                errorMessage: this.control.validators?.filter(x => x.name.toLowerCase() === key.toLowerCase())[0].errorMessage!
              })
            }
          })
          this.errors = newErrors;
        } else {
          this.errors = [];
        }
      })

    })

  }

  ngOnDestroy(): void {
    this.statusChangesSubscription?.unsubscribe();
  }

  get isValid() { return this.form.value.controls[this.control.key].valid; }

}
