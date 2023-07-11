import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { OtherListService } from 'src/app/services/other-list.service';
import { AccountService } from '../account.service';

import { IFormBaseControl } from 'src/app/libraries/dynamic-form/form.service';
import { IDynamicFormEmitOnFormCreated } from 'src/app/libraries/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-user-bank',
  templateUrl: './user-bank.component.html',
  styleUrls: ['./user-bank.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserBankComponent implements OnInit {

  loaded: boolean = false;

  userbankControls$ = new BehaviorSubject<IFormBaseControl[][]>([[]]);

  userbankForm!: FormGroup;

  constructor(
    private otherListService: OtherListService,
    private accountService: AccountService,
  ) {
    this.userbankControls$.next(this.accountService.getUserBankControls(this.onBankChange))
  }

  ngOnInit(): void {

    this.accountService.getAccount()
      .subscribe(x => {
        if (x.ok && x.status === 200) {

          let newControls;

          newControls = this.userbankControls$.value;
          newControls!.map(
            row => row.map(
              column => column.value = x.body.result[column.key]
            )
          );
          this.userbankControls$.next(newControls);

          this.loaded = true;
        }
      })

    this.otherListService.genderList.subscribe(() => this.userbankControls$.next(this.accountService.getUserBankControls(this.onBankChange)));

  }

  onFormCreated(e: IDynamicFormEmitOnFormCreated) {
    this.userbankForm = e.formGroup;
  }

  onSubmit(body: any) {
    this.accountService.updateEmployeeBank(body);
  }

  onBankChange = (e: any) => {
    this.userbankForm.get(e.fieldName)?.setValue(e.value);
  }

}
