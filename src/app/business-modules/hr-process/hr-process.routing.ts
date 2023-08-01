import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProbationaryAssessmentComponent } from './probationary-assessment/probationary-assessment.component';

const routes: Routes = [
  {
    path: 'p-a',
    component: ProbationaryAssessmentComponent,
    canLoad: [AuthGuard],
  },
];

export const HrProcessRoutes = RouterModule.forChild(routes);
