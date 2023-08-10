import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeReportComponent } from './employee-report.component';
import { SyncfusionModule } from 'src/app/syncfusion.module';
import { GroupService } from '@syncfusion/ej2-angular-grids';
import { StringHtmlPipe } from 'src/app/pipe/string-html.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    SyncfusionModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [EmployeeReportComponent,
  ],
  providers: [GroupService],
})
export class EmployeeReportModule { }
