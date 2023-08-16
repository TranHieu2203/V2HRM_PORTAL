import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SelectivePreloadingStrategyService } from '../../selective-preloading-strategy.service';
import { ProfileEmployeeService } from 'src/app/services/profile-employee.service';
import { FormBuilder } from '@angular/forms';
import { Configs } from 'src/app/common/configs';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { Globals } from 'src/app/common/globals';
import { TranslateService } from '@ngx-translate/core';
import { L10n } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {

  showConfig = true;
  showMessenger = true;

  sessionId!: Observable<string>;
  token!: Observable<string>;
  modules: string[] = [];
  data!: any;
  toggleConfig() { this.showConfig = !this.showConfig; }
  toggleMessenger() { this.showMessenger = !this.showMessenger; }

  constructor(
    public configs: Configs,
    private commomHttpService: CommonHttpRequestService,
    private globals: Globals,
    private _formBuilder: FormBuilder,
    protected translate: TranslateService,) {
    L10n.load(this.configs.languageGrid);

  }

  ngOnInit(): void {
    this.commomHttpService.commonGetRequest("GetDashboardInfo", 'hr/BlogInternal/GetMyteam').subscribe((myTeam: any) => {
      let d = (JSON.parse(myTeam.body.message).Data)
      this.data = d.Table
      console.log(this.data)
    })

  }
}
