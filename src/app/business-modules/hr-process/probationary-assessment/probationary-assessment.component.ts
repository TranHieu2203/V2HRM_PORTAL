import { Component, ComponentFactoryResolver, Inject, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { EmployeeReportComponent } from './1-employee-report/employee-report.component';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';
import { DirectManagerReviewComponent } from './2-direct-manager-review/direct-manager-review.component';
import { LineManagerReviewComponent } from './3-line-manager-review/line-manager-review.component';
import { HrReviewComponent } from './4-hr-review/4-hr-review.component';
import { BodReviewComponent } from './5-bod-review/5-bod-review.component';



@Component({
  selector: 'app-probationary-assessment',
  templateUrl: './probationary-assessment.component.html',
  styleUrls: ['./probationary-assessment.component.css']
})
export class ProbationaryAssessmentComponent implements OnInit {
  @ViewChild('embeddedContainer', { read: ViewContainerRef }) embeddedContainer!: ViewContainerRef;

  public selectedDosing = {
    steps: [

      {
        label: '1-employee-report',
        component: EmployeeReportComponent,
      },
      {
        label: '2-direct-manager-review',
        component: DirectManagerReviewComponent,
      },
      {
        label: '3-line-manager-review',
        component: LineManagerReviewComponent,
      },
      {
        label: '4-hr-review',
        component: HrReviewComponent,
      },
      {
        label: '5-bod-review',
        component: BodReviewComponent,
      }
    ]
  }

  constructor(
  ) { }

  ngOnInit() {


  }


}
