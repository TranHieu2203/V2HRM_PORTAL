import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProbationaryAssessmentComponent } from './probationary-assessment/probationary-assessment.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canLoad: [AuthGuard],
  },
  {
    path: 'main',
    component: MainComponent,
    canLoad: [AuthGuard],
  },
  {
    path: 'p-a',
    component: ProbationaryAssessmentComponent,
    canLoad: [AuthGuard],
  },
];

export const HrProcessRoutes = RouterModule.forChild(routes);
