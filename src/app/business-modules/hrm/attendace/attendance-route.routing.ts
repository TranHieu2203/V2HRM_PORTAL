import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './explaint/detail.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DetailComponent,
    canActivate: [AuthGuard],
    resolve: {
    },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [

          {
            path: 'dtl',
            component: DetailComponent,
            canLoad: [AuthGuard],
          },
          {
            path: '',
            redirectTo: 'dtl',
            pathMatch: 'full',
          },
        ]
      }
    ]
  }
];

export const AttendaceRouteRoutes = RouterModule.forChild(routes);
