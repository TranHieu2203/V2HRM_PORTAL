import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from 'src/app/directives.module';

import { CrmRoutingModule } from './crm-routing.module';
import { CrmCenterComponent } from './crm-center/crm-center.component';
import { CrmDashboardComponent } from './crm-dashboard/crm-dashboard.component';
import { MarketingComponent } from './marketing/marketing.component';
import { CustomerCareComponent } from './customer-care/customer-care.component';
import { SaleComponent } from './sale/sale.component';
import { RevenueExpendComponent } from './revenue-expend/revenue-expend.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { PurchaseComponent } from './purchase/purchase.component';


@NgModule({
  declarations: [
    CrmCenterComponent,
    CrmDashboardComponent,
    MarketingComponent,
    CustomerCareComponent,
    SaleComponent,
    RevenueExpendComponent,
    WarehouseComponent,
    PurchaseComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    CrmRoutingModule
  ]
})
export class CrmModule { }
