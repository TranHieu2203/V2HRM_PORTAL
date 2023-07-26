import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeInfo, Situation } from 'src/app/model/employeeInfo';
import { ProfileEmployeeService } from 'src/app/services/profile-employee.service';
import { OtherListService } from 'src/app/services/other-list.service';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { FieldSettingsModel } from '@syncfusion/ej2-dropdowns';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { Configs } from 'src/app/common/configs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  FilterService,
  VirtualScrollService,
  GridComponent,
} from '@syncfusion/ej2-angular-grids';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { Globals } from 'src/app/common/globals';
import { TrainingBefore } from 'src/app/model/trainingbefore';
import { WorkingBefore } from 'src/app/model/workingbefore';
import { Subject } from 'rxjs';
import {
  SelectEventArgs,
} from '@syncfusion/ej2-navigations';

import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { WeekService, MonthService, WorkWeekService, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';

// import { Consts } from "src/app/common/const";
const $ = require('jquery');
const _ = require('lodash');
@Component({
  selector: 'detail-attendace',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  public selectedDate: Date = new Date(2018, 1, 15);
  public showWeekend: boolean = false;

  constructor(
    private profileEmployeeService: ProfileEmployeeService,
    private otherListService: OtherListService,
    private commomHttpService: CommonHttpRequestService,
    private globals: Globals,
    private _formBuilder: FormBuilder
  ) {
  
  }

  ngOnInit() { }


  convertModel(param: any) {
    let model = _.cloneDeep(param);


    return model;
  }


}
