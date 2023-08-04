import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectManagerReviewComponent } from './direct-manager-review.component';
import { SyncfusionModule } from 'src/app/syncfusion.module';
import { GroupService } from '@syncfusion/ej2-angular-grids';
import { StringHtmlPipe } from 'src/app/pipe/string-html.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    SyncfusionModule,
    FormsModule

  ],
  declarations: [DirectManagerReviewComponent,
  ],
  providers: [GroupService],
})
export class DirectManagerReview { }
