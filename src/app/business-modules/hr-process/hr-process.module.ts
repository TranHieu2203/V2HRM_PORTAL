import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrProcessRoutes } from './hr-process.routing';
import { ProfileInfoModule } from './profile-info/profile-info.module';

//probationary-assessment
import { EmployeeReportModule as EmployeeReportModulePA } from './probationary-assessment/1-employee-report/employee-report.module';
import { ProbationaryAssessmentComponent } from './probationary-assessment/probationary-assessment.component';
import { DirectManagerReviewModule as DirectManagerReviewModulePA } from './probationary-assessment/2-direct-manager-review/direct-manager-review.module';
import { LineManagerReviewModule } from './probationary-assessment/3-line-manager-review/line-manager-review.module';
import { HrReviewModule } from './probationary-assessment/4-hr-review/4-hr-review.module';
import { BodReviewModule } from './probationary-assessment/5-bod-review/5-bod-review.module';
//capacity-assessment
import { EmployeeReportModule as EmployeeReportModuleCA } from './capacity-assessment/1-employee-report/employee-report.module'
import { DirectManagerReview as DirectManagerReviewModuleCA } from './capacity-assessment/2-direct-manager-review/direct-manager-review.module';


import { AccordionModule } from '@syncfusion/ej2-angular-navigations';


import { MainComponent } from './main/main.component';
import { SyncfusionModule } from 'src/app/syncfusion.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { CapacityAssessmentComponent } from './capacity-assessment/capacity-assessment.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { ProcessViewModule } from './process-view/process-view.module';
import { HrProcessButtonModule } from './hr-process-button/hr-process-button.module';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { Configs } from 'src/app/common/configs';

@NgModule({

  imports: [
    CommonModule,
    HrProcessRoutes,
    AccordionModule,
    ProfileInfoModule,
    ProcessViewModule,
    HrProcessButtonModule,
    //probationary-assessment
    EmployeeReportModulePA,
    DirectManagerReviewModulePA,
    LineManagerReviewModule,
    HrReviewModule,
    BodReviewModule,
    //capacity-assessment
    EmployeeReportModuleCA,
    DirectManagerReviewModuleCA,
    SyncfusionModule,
    ProgressButtonModule,
    MatStepperModule,
    MatIconModule,
    TabModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    ProbationaryAssessmentComponent,
    CapacityAssessmentComponent,
    MainComponent,
  ],
  exports: [

  ],
  providers: [
    AuthService,
    Configs
  ]
})
export class HrProcessModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
