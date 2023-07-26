import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { EmployeeComponent } from './profile/employee/employee.component';


export const hrmRoutes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendace/attendance.module').then(m => m.AttendanceModule),
    canLoad: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(hrmRoutes)],
  exports: [RouterModule]
})
export class HrmRoutingModule { }
