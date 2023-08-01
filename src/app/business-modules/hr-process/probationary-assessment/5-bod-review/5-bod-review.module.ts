import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodReviewComponent } from './5-bod-review.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@NgModule({
  imports: [
    CommonModule, AccordionModule, TextBoxModule
  ],
  declarations: [BodReviewComponent]
})
export class BodReviewModule { }
