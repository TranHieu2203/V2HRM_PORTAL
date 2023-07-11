import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FormControlService } from 'src/app/libraries/dynamic-form/form-control.service';

import { AccountService } from '../account.service';

import { IAccount } from '../account';
import { FormGroup } from '@angular/forms';

import { IFormBaseControl } from 'src/app/libraries/dynamic-form/form.service';
import { IDynamicFormEmitOnFormCreated } from 'src/app/libraries/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css'],
  providers: [FormControlService],
  encapsulation: ViewEncapsulation.None,
})
export class MoreComponent implements OnInit {

  passportControls$ = new BehaviorSubject<IFormBaseControl[][]>([[]]);
  visaControls$ = new BehaviorSubject<IFormBaseControl[][]>([[]]);
  permitControls$ = new BehaviorSubject<IFormBaseControl[][]>([[]]);
  certificateControls$ = new BehaviorSubject<IFormBaseControl[][]>([[]]);

  passportForm!: FormGroup;
  visaForm!: FormGroup;
  permitForm!: FormGroup;
  certificateForm!: FormGroup;


  account!: IAccount;

  constructor(
    private accountService: AccountService,
  ) {

    this.passportControls$.next(this.accountService.getMorePassportControls());
    this.visaControls$.next(this.accountService.getMoreVisaControls());
    this.permitControls$.next(this.accountService.getMorePermitControls());
    this.certificateControls$.next(this.accountService.getMoreCertificateControls());

  }

  ngOnInit(): void {

    this.accountService.getAccount()
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          let newControls;
          this.account = x.body.result
          // console.log("Thông tin phụ", x.body.result)

           //Thông tin hộ chiếu
           newControls = this.passportControls$.value;
           newControls!.map(
             row => row.map(column => {
               if (column.type === 'date') {
                 column.value = new Date(x.body.result[column.key]);
               } else {
                 column.value = x.body.result[column.key];
               }
             })
           );
          console.log("newControls", newControls)
          this.passportControls$.next(newControls);

           //Số visa
           newControls = this.visaControls$.value;
           newControls!.map(
             row => row.map(column => {
               if (column.type === 'date') {
                 column.value = new Date(x.body.result[column.key]);
               } else {
                 column.value = x.body.result[column.key];
               }
             })
           );
          //console.log("newControls", newControls)
          this.visaControls$.next(newControls);

           //Giấy phép lao động
           newControls = this.permitControls$.value;
           newControls!.map(
             row => row.map(column => {
               if (column.type === 'date') {
                 column.value = new Date(x.body.result[column.key]);
               } else {
                 column.value = x.body.result[column.key];
               }
             })
           );
          //console.log("newControls", newControls)
          this.permitControls$.next(newControls);

          //Chứng chỉ hành nghề
          newControls = this.certificateControls$.value;
          newControls!.map(
            row => row.map(column => {
              if (column.type === 'date') {
                column.value = new Date(x.body.result[column.key]);
              } else {
                column.value = x.body.result[column.key];
              }
            })
          );
         //console.log("newControls", newControls)
         this.certificateControls$.next(newControls);


        }
      })

  }

  onFormCreated(e: IDynamicFormEmitOnFormCreated) {

    switch (e.formName) {
      case 'passportForm':
        this.passportForm = e.formGroup;
        break;
      case 'visaForm':
        this.visaForm = e.formGroup;
        break;
      case 'permitForm':
        this.permitForm = e.formGroup;
        break;
      case 'certificateForm':
        this.certificateForm = e.formGroup;
        break;
      default:

    }
  }
  onSubmitPassport(body: any) {
    this.accountService.updateEmployeePassport(body);
  }
  onSubmitVisa(body: any) {
    this.accountService.updateEmployeeVisa(body);
  }
  onSubmitWorkPermit(body: any) {
    this.accountService.updateEmployeeWorkPermit(body);
  }
  onSubmitCertificate(body: any) {
    this.accountService.updateEmployeeCertificate(body);
  }
}
