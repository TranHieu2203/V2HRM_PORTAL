import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineManagerReviewComponent } from './line-manager-review.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@NgModule({
  imports: [
    CommonModule,
    GridModule,
    AccordionModule,
    RichTextEditorAllModule,
    DialogModule,
    TextBoxModule,
    DropDownListModule,
    NumericTextBoxModule

  ],
  declarations: [LineManagerReviewComponent]
})
export class LineManagerReviewModule { }
