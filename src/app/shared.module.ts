import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from "angular-datatables";

import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { LoadComponent } from './components/load/load.component';
import { TooltipComponent } from './libraries/tooltip/tooltip.component';

@NgModule({
  declarations: [
    PagetitleComponent,
    LoadComponent,
    TooltipComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule // this module is mandatory if some SharedModule components use routing
  ],
  exports: [
    DataTablesModule,
    PagetitleComponent,
    LoadComponent,
    TooltipComponent,
  ],
  providers: [
  ]
})
export class SharedModule { 
  static rootComponent = PagetitleComponent
}
