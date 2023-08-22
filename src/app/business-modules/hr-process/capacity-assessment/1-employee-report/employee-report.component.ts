import { filter, last } from 'rxjs/operators';
import { map } from 'rxjs';
import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Configs } from 'src/app/common/configs';
import { Globals } from 'src/app/common/globals';
import { TranslationLoaderService } from 'src/app/common/translation-loader.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { AuthService } from 'src/app/services/auth.service';
import { CompentencySeltListService } from '../../_services/capacity-assessment/compentency-selt-list.service';
import { GroupSettingsModel } from '@syncfusion/ej2-angular-grids';
import { GridComponent, ToolbarItems } from "@syncfusion/ej2-angular-grids";
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { ProcessTypeService } from '../../_services/process-type.service';
import { ControlService } from '../../_services/control.service';

@Component({
  selector: 'app-1-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {
  table!: any;
  tableRank!: any;
  data: any;
  public groupOptions?: GroupSettingsModel;

  private curentNodeInfo!: any;
  private curentNode!: any;
  private processId: number = 1234;


  @ViewChild("empReportGrid", { static: true })
  public empReportGrid!: GridComponent;


  constructor(protected globals: Globals,
    public configs: Configs,
    protected translationLoaderService: TranslationLoaderService,
    protected _translateService: TranslateService,
    protected _compentencySeltListService: CompentencySeltListService,
    private commonHttpRequestService: CommonHttpRequestService,
    private authService: AuthService,
    private notification: NotificationService,
    private processServices: ProcessTypeService,
    private controlServices: ControlService

  ) {
    this.groupOptions = { columns: ['GROUP_NAME'] };
  }

  ngOnInit() {
    this.controlServices.nodeId$.subscribe(value => {
      this.curentNode = value;
    })

    this.controlServices.curentNodeInfo$.subscribe((value: any) => {
      if (value.length != 0) {
        this.curentNodeInfo = value.nodeInfo.filter((e: any) => e.component === this.constructor.name)[0];
      }
    })

    this.controlServices.processId$.subscribe(value => {
      this.processId = value
      this._compentencySeltListService.getCompentencySeltList(1, value).subscribe((res: any) => {
        this.data = JSON.parse(res.body.message).Data
        this.table = this.data.Table
      })

    })

  }


  // getCompentencySeltList() {
  //   let period = 1
  //   this._compentencySeltListService.getCompentencySeltList(period).subscribe((res: any) => {
  //     this.data = JSON.parse(res.body.message).Data
  //     this.table = this.data.Table
  //   })
  // }

  // check xem đã đánh giá đủ mọi tiêu chí chưa
  // tồn tại 1 tiêu chí mà tất cả rank = 0 return false else return true
  validationRank() {
    let check = true;

    if (this.table != undefined) {
      this.table.forEach((r: any) => {
        if (r["RANK5_CKH"] == 0 && r["RANK4_CKH"] == 0 && r["RANK3_CKH"] == 0 && r["RANK2_CKH"] == 0 && r["RANK1_CKH"] == 0) check = false
      });
    }
    return check;

  }

  updateCompentencySeltList() {
    let rankUpdate: any = [];

    this.table.forEach((row: any) => {
      let object: any = {};
      if (row["RANK5_CKH"] == 1) {
        object.id = row["RANK5"]
        object.value = 1
        rankUpdate.push(object)
      }
      if (row["RANK4_CKH"] == 1) {
        object.id = row["RANK4"]
        object.value = 1
        rankUpdate.push(object)
      }
      if (row["RANK3_CKH"] == 1) {
        object.id = row["RANK3"]
        object.value = 1
        rankUpdate.push(object)
      }
      if (row["RANK2_CKH"] == 1) {
        object.id = row["RANK2"]
        object.value = 1
        rankUpdate.push(object)
      }
      if (row["RANK1_CKH"] == 1) {
        object.id = row["RANK1"]
        object.value = 1
        rankUpdate.push(object)
      }
      // gửi dữ liệu lên server

    });
    let payload = {
      "processId": this.processId,
      "nodeId": this.curentNode,
      "objectId": 1,
      "capacityObjects": rankUpdate
    }
    return this.commonHttpRequestService.commonPostRequest(
      'updateCompentencySeltList',
      this.authService.serverModel.updateCompentencySeltList!, payload
    ).subscribe((res: any) => {
      if (JSON.parse(res.body.message).StatusCode === '200') {
        this.notification.success("[Đã cập nhật kết quả, chờ phê duyệt!]")
        this.controlServices.needLoad.next(true);
      } else {
        this.notification.warning("[Không thể cập nhật kết quả!]")

      }
    })
  }

  changeRank(data: any, rankId: any, e: any, rankName: any, rowId: any) {

    let index = this.table.findIndex((item: any) => item.ID == rowId)
    var checked = e.target.checked

    if (index > -1) {
      this.table[index][rankName] = checked ? 1 : 0;
      if (checked) {
        var newData = Object.assign({}, (this.empReportGrid.dataSource as any)[index]);
        this.table[index] = newData;


        switch (rankName) {
          case "RANK5_CKH":
            {
              newData.RANK1_CKH = 0
              newData.RANK2_CKH = 0
              newData.RANK3_CKH = 0
              newData.RANK4_CKH = 0
              break;
            }
          case "RANK4_CKH":
            {
              newData.RANK1_CKH = 0
              newData.RANK2_CKH = 0
              newData.RANK3_CKH = 0
              newData.RANK5_CKH = 0
              break;

            }
          case "RANK3_CKH":
            {
              newData.RANK1_CKH = 0
              newData.RANK2_CKH = 0
              newData.RANK4_CKH = 0
              newData.RANK5_CKH = 0
              break;

            }
          case "RANK2_CKH":
            {
              newData.RANK1_CKH = 0
              newData.RANK3_CKH = 0
              newData.RANK4_CKH = 0
              newData.RANK5_CKH = 0
              break;

            }
          case "RANK1_CKH":
            {
              newData.RANK2_CKH = 0
              newData.RANK3_CKH = 0
              newData.RANK4_CKH = 0
              newData.RANK5_CKH = 0
              break;

            }
        }

        // this.empReportGrid.setRowData(index, newData)
        this.empReportGrid.refreshColumns();
        this.validationRank()
      }
    }



  }

  viewHtml(str: any) {
    return str.replace("\n", "<br/>")
  }
  formatStt = (index: string) => {
    return (
      parseInt(index, 0) +
      1
    );
  };

}

