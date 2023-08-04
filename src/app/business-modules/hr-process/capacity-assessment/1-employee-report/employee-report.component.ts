import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Configs } from 'src/app/common/configs';
import { Globals } from 'src/app/common/globals';
import { TranslationLoaderService } from 'src/app/common/translation-loader.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { AuthService } from 'src/app/services/auth.service';
import { CompentencySeltListService } from '../../_services/capacity-assessment/compentency-selt-list.service';
import { GroupSettingsModel } from '@syncfusion/ej2-angular-grids';

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

  constructor(protected globals: Globals,
    public configs: Configs,
    protected translationLoaderService: TranslationLoaderService,
    protected _translateService: TranslateService,
    protected _compentencySeltListService: CompentencySeltListService,
    private commonHttpRequestService: CommonHttpRequestService,
    private authService: AuthService
  ) {
    this.groupOptions = { columns: ['GROUP_NAME'] };

  }

  ngOnInit() {
    // this.getCompentencySeltList()
    let period = 1
    this._compentencySeltListService.getCompentencySeltList(period).subscribe((res: any) => {
      this.data = JSON.parse(res.body.message).Data
      this.table = this.data.Table
      console.log(this.table)
    })
  }

  changeRank(rankId: any, e: any) {
    var checked = e.target.checked
    console.log(rankId, checked)
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

