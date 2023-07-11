import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModulesComponent } from './components/modules/modules.component';
import { PopupDeveloperComponent } from './components/popup-developer/popup-developer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { BadgeComponent } from './components/badge/badge.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DeveloperComponent } from './components/developer/developer.component';
import { SmartTableComponent } from './libraries/smart-table/smart-table.component';

import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

import { AuthGuard } from './guards/auth.guard';
import { MccDemoComponent } from './demo/mcc-demo/mcc-demo.component';

import { WaittingScreenComponent } from './libraries/waitting-screen/waitting-screen.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hrm',
    loadChildren: () => import('./business-modules/hrm/hrm.module').then(m => m.HrmModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'account-center',
    loadChildren: () => import('./business-modules/account/account.module').then(m => m.AccountModule),
    canLoad: [AuthGuard],
  },
  
  {
    path: 'hrm-center',
    loadChildren: () => import('./business-modules/hrm/hrm.module').then(m => m.HrmModule),
    data: { preload: true },
    canLoad: [AuthGuard],
  },
  {
    path: 'crm-center',
    loadChildren: () => import('./business-modules/crm/crm.module').then(m => m.CrmModule),
    data: { preload: true },
    canLoad: [AuthGuard],
  },
  {
    path: 'smart-table',
    component: SmartTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mcc-demo',
    component: MccDemoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      // enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategyService,
    }
  )],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard
  ]
})
export class AppRoutingModule { }
