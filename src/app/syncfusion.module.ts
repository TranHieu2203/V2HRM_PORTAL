import { NgModule } from '@angular/core';

import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule, CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { KanbanAllModule } from '@syncfusion/ej2-angular-kanban';
import { GridModule, PagerModule } from '@syncfusion/ej2-angular-grids';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { 
    PageService, 
    SortService, 
    FilterService, 
    SearchService, 
    ToolbarService, 
    FreezeService, 
    SelectionService, 
    ReorderService,
    EditService,
} from '@syncfusion/ej2-angular-grids';

@NgModule({
    declarations: [],
    imports: [
        DashboardLayoutModule,
        GridModule,
        TreeGridModule,
        SwitchModule,
        PagerModule,
        KanbanAllModule, 
        DialogModule, 
        ButtonModule,
        CheckBoxAllModule,
        DatePickerModule, 
        DropDownListAllModule, 
        NumericTextBoxAllModule, 
        TextBoxAllModule, 
        //RouterModule // this module is mandatory if some SharedModule components use routing
    ],
    exports: [
        DashboardLayoutModule,
        GridModule,
        TreeGridModule,
        SwitchModule,
        PagerModule,
        KanbanAllModule, 
        DialogModule, 
        ButtonModule,
        CheckBoxAllModule,
        DatePickerModule, 
        DropDownListAllModule, 
        NumericTextBoxAllModule, 
        TextBoxAllModule, 
    ],
    providers: [
        PageService,
        SortService,
        FilterService,
        SearchService,
        ToolbarService,
        FreezeService,
        SelectionService,
        ReorderService,
        EditService,
    ]
})
export class SyncfusionModule {

}
