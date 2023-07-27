import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendaceRouteRoutes } from './attendance-route.routing';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibrariesModule } from 'src/app/libraries.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DetailComponent } from './detail/detail.component';
import { ScheduleModule, View } from '@syncfusion/ej2-angular-schedule';
import { WeekService, MonthService} from '@syncfusion/ej2-angular-schedule';

@NgModule({
  imports: [
    CommonModule,
    AttendaceRouteRoutes,
    ReactiveFormsModule,
    LibrariesModule,
    FormsModule,
    DropDownListModule,
    DatePickerModule,
    NumericTextBoxModule,
    TabModule,
    GridModule,
    ScheduleModule
  ],
  
  declarations: [DetailComponent],
  providers: [WeekService,
    MonthService]

})
export class AttendanceModule { }