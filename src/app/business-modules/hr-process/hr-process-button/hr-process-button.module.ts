import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrProcessButtonComponent } from './hr-process-button.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    GridModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),

  ],
  declarations: [HrProcessButtonComponent],
  exports: [HrProcessButtonComponent],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService]
})
export class HrProcessButtonModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
