import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './libraries/tooltip/tooltip.directive';
import { DateValueAccessor } from './directives/date-value-accessor';

@NgModule({
    imports: [CommonModule],
    declarations: [TooltipDirective, DateValueAccessor],
    exports: [TooltipDirective, DateValueAccessor]
})
export class DirectivesModule { }