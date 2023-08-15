import { AfterViewInit, Component, ElementRef, Injector, OnInit, QueryList, TemplateRef, ViewChildren, inject } from '@angular/core';
import { EmployeeReportComponent } from './1-employee-report/employee-report.component';
import { LineManagerReviewComponent } from './3-line-manager-review/3-line-manager-review.component';
import { FormBuilder, Validators } from '@angular/forms';
import { } from '@angular/material/stepper';
import { ViewChild } from '@angular/core';
import { DirectManagerReviewComponent } from './2-direct-manager-review/direct-manager-review.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper'
import { ProcessTypeService } from '../_services/process-type.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HrProcessNode } from 'src/app/model/hr-process/hr-process-node';
import { fromEvent } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ControlService } from './control.service';

@Component({
  selector: 'app-capacity-assessment',
  templateUrl: './capacity-assessment.component.html',
  styleUrls: ['./capacity-assessment.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]

})
export class CapacityAssessmentComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;

  injector!: Injector;

  private processId: number = 1234;

  isLinear = false;

  public selectedDosing = {

    steps: [

      {
        label: 'Nhân viên tự đánh giá',
        component: EmployeeReportComponent,
        status: true,
        employeeName: "",
        showTab: true,
        valid: false,
        nodeId: 0
      },
      {
        label: 'Quản lý trực tiếp đánh giá',
        component: DirectManagerReviewComponent,
        status: true,
        employeeName: "",
        showTab: true,
        valid: false,
        nodeId: 0

      },
      {
        label: 'Quản lý đơn vị review',
        component: LineManagerReviewComponent,
        status: false,
        employeeName: "",
        showTab: true,
        valid: false,
        nodeId: 0
      },

    ]
  }

  @ViewChildren('selection', { read: ElementRef })
  selections!: QueryList<ElementRef<HTMLLinkElement>>;

  public baseInfo: any;
  constructor(
    private processServices: ProcessTypeService,
    private notificationServices: NotificationService,
    private controlServices: ControlService

  ) {
    this.controlServices.needLoad.subscribe(value => {

      console.log("needLoad", value)
      this.loadData()

    })

  }


  ngOnInit() {
    this.loadData()

  }
  createInjector(dataObj: any) {
    return Injector.create(
      [{ provide: String, useValue: dataObj }],
      this.injector
    );
  }

  //get data node
  loadData() {
    let id = 1;
    this.processServices.getHrProcessById(this.processId).subscribe((data: any) => {
      if (data.status === 200) {
        // load lại dữ liệu cho process
        // map với nhau theo component name
        var nodeInfo = data.body.data.nodeInfo;
        this.baseInfo = data.body.data.baseInfo
        console.log(this.baseInfo)
        this.selectedDosing.steps.forEach(element => {
          var nodeData = nodeInfo.filter((res: any) => res.component === element.component.name)[0]
          element.label = nodeData.nodeName
          element.employeeName = nodeData.employeeName
          element.status = nodeData.complete
          element.nodeId = nodeData.nodeId
          element.valid = nodeData.valid
        });
      } else (
        this.notificationServices.warning("[Không lấy được dữ liệu!]")
      )
    })
  }

}
