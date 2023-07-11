import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from 'src/app/directives.module';
import { RouterModule } from '@angular/router';
import { hrmRoutes } from './hrm-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    RouterModule.forChild(hrmRoutes),

  ]
})
export class HrmModule { }
