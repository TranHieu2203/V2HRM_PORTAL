import { IModule } from "./modules.component"


import { MarketingComponent } from "src/app/business-modules/crm/marketing/marketing.component"
import { CustomerCareComponent } from "src/app/business-modules/crm/customer-care/customer-care.component"
import { SaleComponent } from "src/app/business-modules/crm/sale/sale.component"
import { RevenueExpendComponent } from "src/app/business-modules/crm/revenue-expend/revenue-expend.component"
import { WarehouseComponent } from "src/app/business-modules/crm/warehouse/warehouse.component"
import { PurchaseComponent } from "src/app/business-modules/crm/purchase/purchase.component"

export const moduledata: IModule[] = [
    {
        index: 0,
        code: 'WORKPLACE',
        businessModule: 'Workplace',
        tooltip: 'WORKPLACE',
        routerLink: 'workplace-center',
        features:[]
    },
    {
        index: 1,
        code: 'HRM',
        businessModule: 'Hrm',
        tooltip: 'QUẢN TRỊ NHÂN LỰC',
        routerLink: 'hrm-center',
        features: [
  
        ]
    },
    {
        index: 2,
        code: 'CRM',
        businessModule: 'Crm',
        tooltip: 'QUẢN LÝ QUAN HỆ KHÁCH HÀNG',
        routerLink: 'crm-center',
        features: [
            {
                code: 'Marketing',
                tooltip: 'Marketing',
                component: MarketingComponent,
                iconClass: 'feather-volume-2',
                routerLink: 'marketing',
            },
            {
                code: 'CSKH',
                tooltip: 'CSKH',
                component: CustomerCareComponent,
                iconClass: 'feather-gift',
                routerLink: 'customercare',
            },
            {
                code: 'Bán hàng',
                tooltip: 'Bán hàng',
                component: SaleComponent,
                iconClass: 'feather-shopping-bag',
                routerLink: 'sale',
            },
            {
                code: 'Thu chi',
                tooltip: 'Thu chi',
                component: RevenueExpendComponent,
                iconClass: 'feather-percent',
                routerLink: 'revenue-expend',
            },
            {
                code: 'Kho hàng',
                tooltip: 'Kho hàng',
                component: WarehouseComponent,
                iconClass: 'feather-map-pin',
                routerLink: 'warehouse',
            },
            {
                code: 'Mua hàng',
                tooltip: 'Mua hàng',
                component: PurchaseComponent,
                iconClass: 'feather-truck',
                routerLink: 'purchase',
            },
        ]
    },
    {
        index: 3,
        code: 'ADVANCE',
        businessModule: 'Advance',
        tooltip: 'NÂNG CAO',
        routerLink: 'advance-center',
        features: []
    },
]