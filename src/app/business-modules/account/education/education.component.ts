import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { OtherListService } from 'src/app/services/other-list.service';
import { AccountService } from '../account.service';

import { IFormBaseControl } from 'src/app/libraries/dynamic-form/form.service';
import { IDynamicFormEmitOnFormCreated } from 'src/app/libraries/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  educationControls$ = new BehaviorSubject<IFormBaseControl[][]>([[]]);

  educationForm!: FormGroup;

  constructor(
    //private fcs: FormControlService,
    private otherListService: OtherListService,
    private accountService: AccountService,
  ) {

    this.educationControls$.next(this.accountService.getEducationControls(this.onEducationChange));

  }

  ngOnInit(): void {
    this.accountService.getAccount()
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          // console.log("education",x.body.result)
          const newControls = this.educationControls$.value;
          newControls!.map(
            row => row.map(
              column => column.value = x.body.result[column.key]
            )
          );
          this.educationControls$.next(newControls);
        }
      })
      this.otherListService.genderList.subscribe(() => this.educationControls$.next(this.accountService.getEducationControls(this.onEducationChange)));
  }

  onFormCreated(e: IDynamicFormEmitOnFormCreated) {
    this.educationForm = e.formGroup;
  }
  onSubmit(body: any) {
    this.accountService.updateEmployeeEducation(body);
  }
  onEducationChange = (e: any) => {
    this.educationForm.get(e.fieldName)?.setValue(e.value);
  }
}
