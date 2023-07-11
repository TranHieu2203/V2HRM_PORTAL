import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { FormControlService } from 'src/app/libraries/dynamic-form/form-control.service';

import { AccountService } from '../account.service';
import { OtherListService } from 'src/app/services/other-list.service';

import { IAccount } from '../account';
import { FormGroup } from '@angular/forms';

import { IFormBaseControl } from 'src/app/libraries/dynamic-form/form.service';
import { IDynamicFormEmitOnFormCreated } from 'src/app/libraries/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [FormControlService],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit, OnDestroy {

  primaryControls$ = new BehaviorSubject<IFormBaseControl[][]>([[]]);
  personalControls$ = new BehaviorSubject<IFormBaseControl[][]>([[]]);
  ownAddressControls$ = new BehaviorSubject<IFormBaseControl[][]>([[]]);
  nowAddressControls$ = new BehaviorSubject<IFormBaseControl[][]>([[]]);
  contactControls$ = new BehaviorSubject<IFormBaseControl[][]>([[]]);

  primaryForm!: FormGroup;
  personalForm!: FormGroup;
  ownAddressForm!: FormGroup;
  nowAddressForm!: FormGroup;
  contactForm!: FormGroup;

  account!: IAccount;

  genderListSubscription!: Subscription;
  getotherListService!: Subscription;
  getotherDistrictListService!: Subscription;
  getotherWardListService!: Subscription;

  constructor(
    private otherListService: OtherListService,
    private accountService: AccountService,
  ) {

    this.primaryControls$.next(this.accountService.getMainPrimaryControls());

    this.ownAddressControls$.next(this.accountService.getMainOwnAddressControls(this.onMainOwnAddressChange));
    this.nowAddressControls$.next(this.accountService.getMainNowAddressControls(this.onMainNowAddressChange));
    this.contactControls$.next(this.accountService.getMainContactControls());

  }

  ngOnInit(): void {

    this.accountService.getAccount()
      .subscribe(x => {
        // console.log("x", x)
        if (x.ok && x.status === 200) {
          let newControls;
          this.account = x.body.result

          //Thông tin chính

          newControls = this.primaryControls$.value;
          newControls!.map(
            row => row.map(
              column => column.value = x.body.result[column.key]
            )
          );
          this.primaryControls$.next(newControls);

          //Thông tin cá nhân
          newControls = this.personalControls$.value;
          newControls!.map(
            row => row.map(column => {
              if (column.type === 'date') {
                column.value = new Date(x.body.result[column.key]);
              } else {
                column.value = x.body.result[column.key];
              }
            })
          );
          this.personalControls$.next(newControls);

          //Địa chỉ thường trú
          newControls = this.ownAddressControls$.value;
          newControls!.map(
            row => row.map(
              column => column.value = x.body.result[column.key]
            )
          );
          this.ownAddressControls$.next(newControls);

          //Địa chỉ hiện tại
          newControls = this.nowAddressControls$.value;
          newControls!.map(
            row => row.map(
              column => {
                console.log("column.key", column.key)
                // console.log(`x.body.result[${column.key}]`, x.body.result[column.key])
                column.value = x.body.result[column.key]
              }
            )
          );
          this.nowAddressControls$.next(newControls);

          //Thông tin liên hệ
          newControls = this.contactControls$.value;
          newControls!.map(
            row => row.map(column => {
              if (column.type === 'date') {
                column.value = new Date(x.body.result[column.key]);
              } else {
                column.value = x.body.result[column.key];
              }
            })
          );
          this.contactControls$.next(newControls);


        }
      })

    this.genderListSubscription = this.otherListService.genderList.subscribe(() => this.personalControls$.next(this.accountService.getMainPersonalControls()));
    this.getotherListService =  this.otherListService.provinceList.subscribe(() => this.ownAddressControls$.next(this.accountService.getMainOwnAddressControls(this.onMainOwnAddressChange)));
    this.getotherDistrictListService =  this.otherListService.districtList.subscribe(() => this.ownAddressControls$.next(this.accountService.getMainOwnAddressControls(this.onMainOwnAddressChange)));
    this.getotherWardListService =  this.otherListService.wardList.subscribe(() => this.ownAddressControls$.next(this.accountService.getMainOwnAddressControls(this.onMainOwnAddressChange)));
    this.getotherListService =  this.otherListService.provinceList.subscribe(() => this.nowAddressControls$.next(this.accountService.getMainNowAddressControls(this.onMainNowAddressChange)));
    this.getotherDistrictListService =  this.otherListService.districtList.subscribe(() => this.nowAddressControls$.next(this.accountService.getMainNowAddressControls(this.onMainNowAddressChange)));
    this.getotherWardListService =  this.otherListService.wardList.subscribe(() => this.nowAddressControls$.next(this.accountService.getMainNowAddressControls(this.onMainNowAddressChange)));

    this.otherListService.genderList.subscribe(() => this.ownAddressControls$.next(this.accountService.getMainOwnAddressControls(this.onMainOwnAddressChange)));
    this.otherListService.genderList.subscribe(() => this.nowAddressControls$.next(this.accountService.getMainOwnAddressControls(this.onMainNowAddressChange)));
  }

  ngOnDestroy(): void {
    this.genderListSubscription.unsubscribe();
    this.getotherListService.unsubscribe();
    this.getotherDistrictListService.unsubscribe();
    this.getotherWardListService.unsubscribe();
  }

  onFormCreated(e: IDynamicFormEmitOnFormCreated) {

    switch (e.formName) {
      case 'primaryForm':
        this.primaryForm = e.formGroup;
        break;
      case 'personalForm':
        this.personalForm = e.formGroup;
        break;
      case 'ownAddressForm':
        this.ownAddressForm = e.formGroup;
        break;
      case 'nowAddressControls':
        this.nowAddressForm = e.formGroup;
        break;
      case 'contactForm':
        this.contactForm = e.formGroup;
        break;
      default:

    }
  }

  onSubmitMainInfo(body: any) {
    this.accountService.updateEmployeeMainInfo(body);
  }
  onSubmitInfo(body: any) {
    this.accountService.updateEmployeeInfo(body);
  }
  onSubmitAddress(body: any) {
    this.accountService.updateEmployeeAddress(body);
  }
  onSubmitCurAddress(body: any) {
    this.accountService.updateEmployeeCurAddress(body);
  }
  onSubmitContactInfo(body: any) {
    this.accountService.updateEmployeeContactInfo(body);
  }
  onMainOwnAddressChange = (e: any) => {
    this.ownAddressForm.get(e.fieldName)?.setValue(e.value);
  }
  onMainNowAddressChange = (e: any) => {
    this.nowAddressForm.get(e.fieldName)?.setValue(e.value);
  }
}
