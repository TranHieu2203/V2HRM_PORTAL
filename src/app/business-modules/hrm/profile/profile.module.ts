import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRouteRoutes } from './profile-route.routing';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibrariesModule } from 'src/app/libraries.module';
import { EmployeeComponent } from './employee/employee.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  imports: [
    CommonModule,
    ProfileRouteRoutes,
    ReactiveFormsModule,
    LibrariesModule,
    FormsModule,
    DropDownListModule,
    DatePickerModule,
    NumericTextBoxModule,
    TabModule,
    GridModule 
  ],
  
  declarations: [EmployeeComponent]
})
export class ProfileModule { }
