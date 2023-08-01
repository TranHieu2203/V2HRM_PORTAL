import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  imports: [
    CommonModule, GridModule, AccordionModule
  ],
  declarations: [ProfileInfoComponent],
  exports: [ProfileInfoComponent]
})
export class ProfileInfoModule { }
