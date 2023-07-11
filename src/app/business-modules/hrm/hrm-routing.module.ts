import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { EmployeeComponent } from './profile/employee/employee.component';


export const hrmRoutes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    canActivate: [AuthGuard],
    resolve: {
    },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
         
          {
            path: 'profile',
            loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
            canLoad: [AuthGuard],
                  },
          {
            path: '',
            redirectTo: 'employee',
            pathMatch: 'full',
          },
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(hrmRoutes)],
  exports: [RouterModule]
})
export class HrmRoutingModule { }
