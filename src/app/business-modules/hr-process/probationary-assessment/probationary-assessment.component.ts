import { filter } from 'rxjs/operators';
import { ProcessTypeService } from './../_services/process-type.service';
import { Component, ComponentFactoryResolver, Inject, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { EmployeeReportComponent } from './1-employee-report/employee-report.component';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';
import { DirectManagerReviewComponent } from './2-direct-manager-review/direct-manager-review.component';
import { LineManagerReviewComponent } from './3-line-manager-review/line-manager-review.component';
import { HrReviewComponent } from './4-hr-review/4-hr-review.component';
import { BodReviewComponent } from './5-bod-review/5-bod-review.component';
import { NotificationService } from 'src/app/services/notification.service';



@Component({
  selector: 'app-probationary-assessment',
  templateUrl: './probationary-assessment.component.html',
  styleUrls: ['./probationary-assessment.component.css']
})
export class ProbationaryAssessmentComponent implements OnInit {
  @ViewChild('embeddedContainer', { read: ViewContainerRef }) embeddedContainer!: ViewContainerRef;
  id: number = 1234;
  public selectedDosing = {
    steps: [

      {
        label: '1-employee-report',
        component: EmployeeReportComponent, status: true,
        employeeName: ""

      },
      {
        label: '2-direct-manager-review',
        component: DirectManagerReviewComponent, status: true,
        employeeName: ""

      },
      {
        label: '3-line-manager-review',
        component: LineManagerReviewComponent, status: false,
        employeeName: ""

      },
      {
        label: '4-hr-review',
        component: HrReviewComponent, status: false,
        employeeName: ""

      },
      {
        label: '5-bod-review',
        component: BodReviewComponent, status: false,
        employeeName: ""

      }
    ]
  }
  public baseInfo: any;
  constructor(
    private processServices: ProcessTypeService,
    private notificationServices: NotificationService,
  ) { }

  ngOnInit() {

    this.loadData();

  }
  //get data node
  loadData() {
    let id = 1;
    this.processServices.getHrProcessById(this.id).subscribe((data: any) => {
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
        });
      } else (
        this.notificationServices.warning("[Không lấy được dữ liệu!]")
      )
    })
  }


}
