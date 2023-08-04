import { Component, OnInit } from '@angular/core';
import { EmployeeReportComponent } from './1-employee-report/employee-report.component';
import { LineManagerReviewComponent } from './3-line-manager-review/3-line-manager-review.component';
import { FormBuilder, Validators } from '@angular/forms';
import { } from '@angular/material/stepper';
import { ViewChild } from '@angular/core';
import { DirectManagerReviewComponent } from './2-direct-manager-review/direct-manager-review.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper'

@Component({
  selector: 'app-capacity-assessment',
  templateUrl: './capacity-assessment.component.html',
  styleUrls: ['./capacity-assessment.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]

})
export class CapacityAssessmentComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;


  public selectedDosing = {
    steps: [

      {
        label: 'Nhân viên tự đánh giá',
        component: EmployeeReportComponent,
        status: true
      },
      {
        label: 'Quản lý trực tiếp đánh giá',
        component: DirectManagerReviewComponent,
        status: true

      },
      {
        label: 'Quản lý đơn vị review',
        component: LineManagerReviewComponent,
        status: false
      },

    ]
  }

  currentUserInteractions = [
    { name: 'first', key: 'firstStep' },
    { name: 'second', key: 'secondStep' },
    { name: 'third', key: 'thirdStep' },
    { name: 'fourth', key: 'fourthStep' },
  ];
  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

}
