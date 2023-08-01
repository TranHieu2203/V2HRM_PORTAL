import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrReviewComponent } from './4-hr-review.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    TextBoxModule
  ],
  declarations: [HrReviewComponent]
})
export class HrReviewModule { }
