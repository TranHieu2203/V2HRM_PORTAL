import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
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
            path: 'employee',
            component: EmployeeComponent,
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
  }
];

export const ProfileRouteRoutes = RouterModule.forChild(routes);
