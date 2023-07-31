import { ExplaintService } from './explaint.service';
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
import { SearchModel } from 'src/app/model/searchmodel';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from "src/assets/i18n/en";
import { locale as vietnam } from "src/assets/i18n/vi";
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-angular-popups';
import { TimeExplainModel } from '../../../../model/timeexplain'
const $ = require('jquery');
const _ = require('lodash');
@Component({
  selector: 'detail-attendace',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {

  @ViewChild('defaultDialog')
  public defaultDialog!: DialogComponent;


  public selectedDate: Date = new Date(2018, 1, 15);
  public showWeekend: boolean = false;
  editForm!: FormGroup;
  searchModel!: SearchModel;
  languages: any;
  editModel!: TimeExplainModel;
  data!: any;
  editHeaderText = "";
  public animationSettings: Object = { effect: 'Zoom', duration: 400, delay: 0 };
  public positionDialog: object = { Y: 20 };
  public loadingIndicator?: any;

  constructor(
    public configs: Configs,
    private profileEmployeeService: ProfileEmployeeService,
    private otherListService: OtherListService,
    private commomHttpService: CommonHttpRequestService,
    private globals: Globals,
    private _formBuilder: FormBuilder,
    protected translate: TranslateService,
    protected explaintService: ExplaintService,

  ) {
    this.editForm = this._formBuilder.group({
      workingDay: [""],
      valTime1: [""],
      valTime4: [""]
    });
    this.languages = this.globals.currentLang;
    console.log("this.configs.height()", this.configs.height())
  }

  ngOnInit() {
    this.loadingIndicator = { indicatorType: 'Shimmer' };
    this.translate.use(this.languages);
    this.explaintService.getTimeExplaint().subscribe((res: any) => {
      console.log("res", res)
      this.data = res.body.data
    })
  }

  getListData = (): void => {
  }
  showDialog(data: any) {
    this.editModel = _.cloneDeep(data);
    this.editHeaderText = "Giải trình công ngày " + this.editModel.WORKINGDAY
    this.defaultDialog.show();
    console.log("this.editModel", data)
  }
  changeDate = (model: any) => {
    setTimeout(() => {
      const idDate = "#" + model + "_input";
      const value = $(idDate).val();
      var patt = new RegExp(
        "q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m"
      );
      var patt1 = new RegExp(
        /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.]/
      );
      // check nhập sai năm
      if (value && value.indexOf("/") != -1) {
        let valueArray = value.split("/");
        if (valueArray.length != 3) {
          this.editForm.get(model)!.setErrors({ incorrect: true });
          return;
        }
        if (valueArray[0].length != 2 || valueArray[1].length != 2 || valueArray[2].length != 4) {
          this.editForm.get(model)!.setErrors({ incorrect: true });
          return;
        }
      }
      let FindSpace = value.indexOf(" ");
      if (FindSpace != -1) {
        this.editForm.get(model)!.setErrors({ incorrect: true });
        return;
      } else
        if (value.length === 0) {
          this.editForm.get(model)!.setErrors({ required: true });
          return;
        } else if (value.length > 0 && (patt.test(value.toLowerCase()) === true || patt1.test(value.toLowerCase()) === true)) {
          this.editForm.get(model)!.setErrors({ incorrect: true });
          return;
        } else if (value.length > 10) {
          this.editForm.get(model)!.setErrors({ incorrect: true });
          return;
        } else {
          this.editForm.get(model)!.setErrors(null);
        }
      if (
        value &&
        ((value.length === 8 && value.indexOf("/") === -1) ||
          (value.length === 6 && value.indexOf("/") === -1) ||
          (value.length === 10 && value.indexOf("/") > -1))
      ) {
        if (value.indexOf("-") === -1) {
          const returnDate = this.globals.replaceDate(value);
          // (this.model as any)[model] = returnDate;
          if (returnDate && returnDate.length > 0) {
            $(idDate).val(returnDate);
            const dateParts: any = returnDate.split("/");
            (this.editModel as any)[model] = new Date(
              +dateParts[2],
              dateParts[1] - 1,
              +dateParts[0]
            );
            this.editForm.get(model)!.clearValidators();
          }
        }
      }
    }, 200);
  };
  convertModel(param: any) {
    let model = _.cloneDeep(param);


    return model;
  }


}
