import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
import { SyncfusionModule } from './syncfusion.module';
import { DirectivesModule } from './directives.module';
import { DataTablesModule } from 'angular-datatables';

import { WaittingScreenComponent } from './libraries/waitting-screen/waitting-screen.component';
import { MccComponent } from './libraries/mcc/mcc.component';
import { MccBoxComponent } from './libraries/mcc/mcc-box/mcc-box.component';
import { MccDatatableComponent } from './libraries/mcc/mcc-datatable/mcc-datatable.component';
import { SmartTableComponent } from './libraries/smart-table/smart-table.component';
import { MccSearchComponent } from './libraries/mcc/mcc-search/mcc-search.component';
import { SearchComponent } from './libraries/search/search.component';
import { PaginationComponent } from './libraries/pagination/pagination.component';
import { LoaderComponent } from './libraries/loader/loader.component';
import { SfGridComponent } from './libraries/sf-grid/sf-grid.component';
import { DynamicFormComponent } from './libraries/dynamic-form/dynamic-form.component';
import { DynamicControlComponent } from './libraries/dynamic-form/dynamic-control.component';
import { TaskReminderComponent } from './components/task-reminder/task-reminder.component';
import { TaskCardComponent } from './components/task-card/task-card.component';

import { TableDataPipe } from './pipe/table-data.pipe';
import { ShortTimePipe } from './pipe/short-time.pipe';
import { VnDatePipe } from './pipe/vn-date.pipe';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        SyncfusionModule,
        DirectivesModule, 
        DataTablesModule],
    declarations: [
        WaittingScreenComponent,
        MccComponent,
        MccBoxComponent,
        MccDatatableComponent,
        SmartTableComponent,
        MccSearchComponent,
        SearchComponent,
        PaginationComponent,
        LoaderComponent,
        SfGridComponent,
        DynamicFormComponent,
        DynamicControlComponent,
        TaskReminderComponent,
        TaskCardComponent,

        TableDataPipe,
        ShortTimePipe,
        VnDatePipe,
    ],
    exports: [
        WaittingScreenComponent,
        MccComponent,
        SmartTableComponent,
        PaginationComponent,
        SfGridComponent,
        DynamicFormComponent,
        TaskReminderComponent,
        TaskCardComponent,

        TableDataPipe,
        ShortTimePipe,
        VnDatePipe,
        AccordionModule
    ]
})
export class LibrariesModule { }