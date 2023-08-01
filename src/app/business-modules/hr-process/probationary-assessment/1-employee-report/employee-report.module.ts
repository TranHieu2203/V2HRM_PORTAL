import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeReportComponent } from './employee-report.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    GridModule,
    TextBoxModule
  ],
  exports: [EmployeeReportComponent],
  declarations: [EmployeeReportComponent]
})
export class EmployeeReportModule {

}
