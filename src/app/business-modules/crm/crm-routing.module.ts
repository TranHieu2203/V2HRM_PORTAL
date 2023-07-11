import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';

import { CrmCenterComponent } from './crm-center/crm-center.component';
import { CrmDashboardComponent } from './crm-dashboard/crm-dashboard.component';
import { MarketingComponent } from './marketing/marketing.component';
import { CustomerCareComponent } from './customer-care/customer-care.component';
import { SaleComponent } from './sale/sale.component';
import { RevenueExpendComponent } from './revenue-expend/revenue-expend.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { PurchaseComponent } from './purchase/purchase.component';

const hrmRoutes: Routes = [
  {
    path: '',
    component: CrmCenterComponent,
    canActivate: [AuthGuard],
    resolve: {
      //somedata: 
    },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'dashboard',
            component: CrmDashboardComponent,
          },
          {
            path: 'marketing',
            component: MarketingComponent,
          },
          {
            path: 'customercare',
            component: CustomerCareComponent,
          },
          {
            path: 'sale',
            component: SaleComponent,
          },
          {
            path: 'revenue-expend',
            component: RevenueExpendComponent,
          },
          {
            path: 'warehouse',
            component: WarehouseComponent,
          },
          {
            path: 'purchase',
            component: PurchaseComponent,
          },
          {
            path: '',
            redirectTo: 'dashboard',
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
export class CrmRoutingModule { }
