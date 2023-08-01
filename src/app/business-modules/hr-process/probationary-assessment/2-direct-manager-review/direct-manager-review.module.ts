import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectManagerReviewComponent } from './direct-manager-review.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
@NgModule({
  imports: [
    CommonModule,
    GridModule,
    AccordionModule,
    RichTextEditorAllModule,
    DialogModule
  ],
  declarations: [DirectManagerReviewComponent]
})
export class DirectManagerReviewModule { }
