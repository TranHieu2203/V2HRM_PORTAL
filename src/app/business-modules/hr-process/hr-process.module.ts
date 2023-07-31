import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrProcessRoutes } from './hr-process.routing';
import { EmployeeReportModule } from './probationary-assessment/employee-report/employee-report.module';
import { ProbationaryAssessmentComponent } from './probationary-assessment/probationary-assessment.component';
import { ProfileInfoModule } from './profile-info/profile-info.module';

@NgModule({

  imports: [
    CommonModule,
    HrProcessRoutes,
    EmployeeReportModule,
    ProfileInfoModule
  ],
  declarations: [
    ProbationaryAssessmentComponent
  ],
  exports: [
  ]
})
export class HrProcessModule { }
