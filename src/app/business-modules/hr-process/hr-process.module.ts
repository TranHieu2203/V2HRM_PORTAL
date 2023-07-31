import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrProcessRoutes } from './hr-process.routing';
import { EmployeeReportModule } from './probationary-assessment/1-employee-report/employee-report.module';
import { ProbationaryAssessmentComponent } from './probationary-assessment/probationary-assessment.component';
import { ProfileInfoModule } from './profile-info/profile-info.module';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { DirectManagerReviewModule } from './probationary-assessment/2-direct-manager-review/direct-manager-review.module';
import { LineManagerReviewModule } from './probationary-assessment/3-line-manager-review/line-manager-review.module';
import { HrReviewModule } from './probationary-assessment/4-hr-review/4-hr-review.module';
import { BodReviewModule } from './probationary-assessment/5-bod-review/5-bod-review.module';

@NgModule({

  imports: [
    CommonModule,
    HrProcessRoutes,
    AccordionModule,
    ProfileInfoModule,
    //probationary-assessment
    EmployeeReportModule,
    DirectManagerReviewModule,
    LineManagerReviewModule,
    HrReviewModule,
    BodReviewModule

  ],
  declarations: [
    ProbationaryAssessmentComponent
  ],
  exports: [
  ]
})
export class HrProcessModule { }
