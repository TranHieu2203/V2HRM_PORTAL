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
  selector: 'line-manager-review',
  templateUrl: './3-line-manager-review.component.html',
  styleUrls: ['./3-line-manager-review.component.css']
})
export class LineManagerReviewComponent implements OnInit {
  private curentNodeInfo!: any;

  private processId: number = 1234;

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
  ) { }

  ngOnInit() {
    this.controlServices.curentNodeInfo$.subscribe((value: any) => {
      if (value.length != 0) {
        this.curentNodeInfo = value.nodeInfo.filter((e: any) => e.component === this.constructor.name)[0];
      }
    })

  }

}
