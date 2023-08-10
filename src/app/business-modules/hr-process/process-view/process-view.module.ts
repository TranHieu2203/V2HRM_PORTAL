import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessViewComponent } from './process-view.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    MatStepperModule,
    MatIconModule
  ],
  declarations: [ProcessViewComponent],
  exports: [ProcessViewComponent]

})
export class ProcessViewModule { }
