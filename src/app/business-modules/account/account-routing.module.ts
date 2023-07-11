import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountCenterComponent } from './account-center/account-center.component';
import { MainComponent } from './main/main.component';
import { MoreComponent } from './more/more.component';
import { EducationComponent } from './education/education.component';
import { UserBankComponent } from './user-bank/user-bank.component';
import { SituationComponent } from './situation/situation.component';
import { PaperComponent } from './paper/paper.component';
import { BonusComponent } from './bonus/bonus.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { ContractComponent } from './contract/contract.component';
import { WorkingComponent } from './working/working.component';
import { InschangeComponent } from './inschange/inschange.component';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { CanDeactivateMainGuard } from './main/can-deactivate-main.guard';
import { CanDeactivateMoreGuard } from './more/can-deactivate-more.guard';

const routes: Routes = [
  {
    path: '',
    component: AccountCenterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'main',
            component: MainComponent,
            canDeactivate: [CanDeactivateMainGuard]
          },
          {
            path: 'more',
            component: MoreComponent,
            canDeactivate: [CanDeactivateMoreGuard]
          },
          {
            path: 'education',
            component: EducationComponent,
          },
          {
            path: 'userbank',
            component: UserBankComponent,
          },
          {
            path: 'situation',
            component: SituationComponent,
          },
          {
            path: 'paper',
            component: PaperComponent,
          },
          {
            path: 'bonus',
            component: BonusComponent,
          },
          {
            path: 'discipline',
            component: DisciplineComponent,
          },
          {
            path: 'contract',
            component: ContractComponent,
          },
          {
            path: 'working',
            component: WorkingComponent,
          },
          {
            path: 'inschange',
            component: InschangeComponent,
          },
          {
            path: '',
            redirectTo: 'main',
            pathMatch: 'full',
          },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
