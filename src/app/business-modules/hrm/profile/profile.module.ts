import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRouteRoutes } from './profile-route.routing';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibrariesModule } from 'src/app/libraries.module';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRouteRoutes,
    ReactiveFormsModule,
    LibrariesModule,
    FormsModule
  ],
  declarations: [EmployeeComponent]
})
export class ProfileModule { }
