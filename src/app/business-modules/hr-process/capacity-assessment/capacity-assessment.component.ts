import { AfterViewInit, Component, ElementRef, Injector, OnDestroy, OnInit, QueryList, TemplateRef, ViewChildren, inject } from '@angular/core';
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
import { Subscription, fromEvent } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ControlService } from '../_services/control.service';

@Component({
  selector: 'app-capacity-assessment',
  templateUrl: './capacity-assessment.component.html',
  styleUrls: ['./capacity-assessment.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]

})
export class CapacityAssessmentComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') stepper!: MatStepper;

  injector!: Injector;

  private processId: number = 1234;
  private curentNode!: any;
  isLinear = false;
  public lstStep: any[] = []
  public selectedDosing = {

    steps: [

      {
        label: 'Nhân viên tự đánh giá',
        component: EmployeeReportComponent,
        status: 0,
        employeeName: "",
        showTab: true,
        valid: false,
        lock: false,
        nodeId: "",
      },
      {
        label: 'Quản lý trực tiếp đánh giá',
        component: DirectManagerReviewComponent,
        status: 0,
        employeeName: "",
        showTab: true,
        valid: false,
        lock: false,
        nodeId: ""

      },
      {
        label: 'Quản lý đơn vị review',
        component: LineManagerReviewComponent,
        status: 0,
        employeeName: "",
        showTab: true,
        valid: false,
        lock: false,
        nodeId: ""
      },

    ]
  }

  @ViewChildren('selection', { read: ElementRef })
  selections!: QueryList<ElementRef<HTMLLinkElement>>;

  public baseInfo: any;



  nodeIdSubscription!: Subscription;
  curentNodeInfoSubscription!: Subscription;
  getHrProcessByIdSubscription!: Subscription;

  constructor(
    private processServices: ProcessTypeService,
    private notificationServices: NotificationService,
    private controlServices: ControlService

  ) {
  }
  ngOnDestroy(): void {
    this.nodeIdSubscription.unsubscribe()
    this.curentNodeInfoSubscription.unsubscribe()

  }


  ngOnInit() {
    // this.loadData()

    this.nodeIdSubscription = this.controlServices.nodeId$.subscribe(value => {
      this.curentNode = value;
    })

    this.curentNodeInfoSubscription = this.controlServices.curentNodeInfo$.subscribe((value: any) => {
      this.lstStep = []

      if (value.length !== 0) {
        this.baseInfo = value.baseInfo
        this.selectedDosing.steps.forEach((element: any) => {
          var nodeData = value.nodeInfo.filter((res: any) => res.component === element.component.name)[0]
          element.label = nodeData.nodeName
          element.employeeName = nodeData.employeeName
          element.status = nodeData.status
          element.nodeId = nodeData.nodeId
          element.valid = nodeData.valid
          element.status = nodeData.status
          element.showTab = this.curentNode == nodeData.nodeId ? true : false;
          element.complete = nodeData.complete
          if (element.status > 1) { element.icon = 'feather-check' }
          else { element.icon = 'feather-minus' }
          this.lstStep.push(element)
        });
      }

    })
  }
  createInjector(dataObj: any) {
    return Injector.create(
      [{ provide: String, useValue: dataObj }],
      this.injector
    );
  }

  trackByFn(index: any) {
    return index;
  }

  //get data node
  loadData() {
    let id = 1;
    this.getHrProcessByIdSubscription = this.processServices.getHrProcessById(this.processId).subscribe((data: any) => {
      if (data.status === 200) {
        // load lại dữ liệu cho process
        // map với nhau theo component name
        var nodeInfo = data.body.data.nodeInfo;
        this.baseInfo = data.body.data.baseInfo

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
