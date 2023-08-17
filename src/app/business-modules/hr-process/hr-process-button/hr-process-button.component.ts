import { filter } from 'rxjs/operators';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Configs } from 'src/app/common/configs';
import { Globals } from 'src/app/common/globals';
import { TranslationLoaderService } from 'src/app/common/translation-loader.service';
import { locale as english } from "src/assets/i18n/en";
import { locale as vietnam } from "src/assets/i18n/vi";
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ControlService } from '../_services/control.service';

@Component({
  selector: 'hr-process-button',
  templateUrl: './hr-process-button.component.html',
  styleUrls: ['./hr-process-button.component.css']
})
export class HrProcessButtonComponent implements OnInit {


  @Input() nodeId: any;
  @Input() buttonNodeName: any
  private curentNodeInfo!: any;

  //SEND|CANCEL|APPROVE|REJECT|SUBMIT|SEND_BACK|BREAK|REASSIGN
  public lstButton: any = [
    {
      id: "SEND",
      text: "[SEND]",
      function: this.onSend,
      class: "btn-warning",
      icon: "feather-send"
    },
    {
      id: "CANCEL",
      text: "[CANCEL]",
      function: this.onCancel,
      class: "btn-outline-warning",
      icon: "feather-x-circle"
    },
    {
      id: "APPROVE",
      text: "[APPROVE]",
      function: this.onApprove,
      class: "btn-outline-warning",
      icon: "feather-user-check"
    },
    {
      id: "REJECT",
      text: "[REJECT]",
      function: this.onReject,
      class: "btn-outline-warning",
      icon: "feather-user-x"
    },
    {
      id: "SUBMIT",
      text: "[SUBMIT]",
      function: this.onSubmit,
      class: "btn-outline-warning",
      icon: "feather-check-circle"
    },
    {
      id: "SEND_BACK",
      text: "[SEND_BACK]",
      function: this.onSend_Back,
      class: "btn-outline-secondary",
      icon: "feather-skip-back"
    },
    {
      id: "BREAK",
      text: "[BREAK]",
      function: this.onBreak,
      class: "btn-outline-dark",
      icon: "feather-skip-forward"
    },
    {
      id: "REASSIGN",
      text: "[REASSIGN]",
      function: this.onReassign,
      class: "btn-outline-warning",
      icon: "feather-search"
    },
  ]
  lstNodeButton: any[] = [];
  languages!: any;

  constructor(protected translationLoaderService: TranslationLoaderService,
    protected _translateService: TranslateService,
    protected globals: Globals,
    public configs: Configs,
    private commonHttpRequestService: CommonHttpRequestService,
    private authServices: AuthService,
    private notificationService: NotificationService,
    private controlServices: ControlService
  ) {
    this.languages = this.globals.currentLang;
    this._translateService.use(this.languages);
    this.translationLoaderService.loadTranslations(vietnam, english);



  }

  ngOnInit() {
    console.log('nodeId', this.nodeId)
    console.log('buttonNodeName', this.buttonNodeName)

    this.controlServices.curentNodeInfo$.subscribe((value: any) => {
      if (value.length != 0) {
        this.curentNodeInfo = value.nodeInfo.filter((e: any) => e.nodeId === this.nodeId)[0];
        let action = this.curentNodeInfo.action.split("|");
        this.lstNodeButton = [];
        action.forEach((name: any) => {
          var button = this.lstButton.filter((e: any) => e.id.toLowerCase() === name.toLowerCase())[0]
          console.log(button, button)
          this.lstNodeButton.push(button)
        });
        console.log("action", action)

      }
    })
  }

  actionMessage(res: any) {
    debugger;
    if (res.ok) {
      if (res.body.status === "400") {
        this.notificationService.error("[Không có quyền thực hiện]")
      }
      if (res.body.status === "SUCCESS") {
        this.notificationService.success("[Thực hiện thành công]")
      }
      if (res.body.status === "ERROR") {
        this.notificationService.warning("[Thao tác không thực hiện được]")
      }


      this.controlServices.needLoad.next(true)
    }
  }

  onSend() {
    this.commonHttpRequestService.commonPostRequest("onSend", this.authServices.serverModel.onSend!, { nodeId: this.nodeId }).subscribe((res: any) => {
      this.actionMessage(res);
    })
  }
  onCancel() {
    this.commonHttpRequestService.commonPostRequest("onCancel", this.authServices.serverModel.onCancel!, { nodeId: this.nodeId }).subscribe((res: any) => {
      this.actionMessage(res);
    })
  }
  onApprove() {

    this.commonHttpRequestService.commonPostRequest("onApprove", this.authServices.serverModel.onApprove!, { nodeId: this.nodeId }).subscribe((res: any) => {
      this.actionMessage(res);
    })
  }
  onReject() {
    this.commonHttpRequestService.commonPostRequest("onReject", this.authServices.serverModel.onApprove!, { nodeId: this.nodeId }).subscribe((res: any) => {
      this.actionMessage(res);
    })
  }
  onSubmit() {
    this.commonHttpRequestService.commonPostRequest("onSubmit", this.authServices.serverModel.onSubmit!, { nodeId: this.nodeId }).subscribe((res: any) => {
      this.actionMessage(res);
    })
  }
  onSend_Back() {
    this.commonHttpRequestService.commonPostRequest("onSend_Back", this.authServices.serverModel.onSend_Back!, { nodeId: this.nodeId }).subscribe((res: any) => {
      this.actionMessage(res);
    })
  }
  onBreak() {
    this.commonHttpRequestService.commonPostRequest("onBreak", this.authServices.serverModel.onBreak!, { nodeId: this.nodeId }).subscribe((res: any) => {
      this.actionMessage(res);
    })
  }

  onReassign() {
    console.log(this.onReassign)
  }

}
