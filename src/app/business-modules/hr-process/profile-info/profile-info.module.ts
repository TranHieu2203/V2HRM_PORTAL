import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProfileInfoComponent],
  exports: [ProfileInfoComponent]
})
export class ProfileInfoModule { }
