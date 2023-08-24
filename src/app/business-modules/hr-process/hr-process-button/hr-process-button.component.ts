import { filter } from 'rxjs/operators';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Configs } from 'src/app/common/configs';
import { Globals } from 'src/app/common/globals';
import { TranslationLoaderService } from 'src/app/common/translation-loader.service';
import { locale as english } from "src/assets/i18n/en";
import { locale as vietnam } from "src/assets/i18n/vi";
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ControlService } from '../_services/control.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { SelectionSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { Router } from '@angular/router';

@Component({
  selector: 'hr-process-button',
  templateUrl: './hr-process-button.component.html',
  styleUrls: ['./hr-process-button.component.css']
})
export class HrProcessButtonComponent implements OnInit {

  @Input() processId: any;
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

  data!: any;

  allowDialog: boolean = false;

  windownWidth: number = 0;
  windownHeight: number = 0;

  @ViewChild('ejDialog') ejDialog: DialogComponent | any;
  @ViewChild('container', { read: ElementRef }) container: ElementRef | any;
  public targetElement?: HTMLElement;
  public selectionOptions?: SelectionSettingsModel;

  private employeeSelected!: any;
  private confirm!: any;
  constructor(protected translationLoaderService: TranslationLoaderService,
    protected _translateService: TranslateService,
    protected globals: Globals,
    public configs: Configs,
    private commonHttpRequestService: CommonHttpRequestService,
    private authServices: AuthService,
    private notificationService: NotificationService,
    private controlServices: ControlService,
    private router:Router
  ) {
    this.languages = this.globals.currentLang;
    this._translateService.use(this.languages);
    this.translationLoaderService.loadTranslations(vietnam, english);
    this.selectionOptions = { type: 'Single', mode: 'Row' };



  }

  ngOnInit() {
    this.windownWidth = window.innerWidth;
    this.windownHeight = window.innerHeight;
    this.controlServices.curentNodeInfo$.subscribe((value: any) => {
      if (value.length != 0) {
        this.curentNodeInfo = value.nodeInfo.filter((e: any) => e.nodeId === this.nodeId)[0];
        let action = this.curentNodeInfo.action.split("|");
        this.lstNodeButton = [];
        action.forEach((name: any) => {
          var button = this.lstButton.filter((e: any) => e.id.toLowerCase() === name.toLowerCase())[0]
          this.lstNodeButton.push(button)
        });

      }
    })
  }
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windownWidth = window.innerWidth;
    this.windownHeight = window.innerHeight;

  }

  actionMessage(res: any) {
    if (res.ok) {
      if (res.body.status === "400") {
        this.notificationService.error("[Không có quyền thực hiện]")
      }
      if (res.body.status === "SUCCESS") {
        this.notificationService.success("[Thực hiện thành công]")
        console.log("res.body",res.body)
        if(res.body.next==1){
          this.router.navigate(['hr-process/c-a'], { queryParams: { process: this.processId,node:res.body.nextNode } });

        }
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
    this.allowDialog = true;
    this.commonHttpRequestService.commonPostRequest("getAuthority", this.authServices.serverModel.getAuthority!, {}).subscribe((res: any) => {
      this.data = res.body
      this.onOpenDialog()
    })
  }

  affterReassign() {

  }

  public onOpenConfirm = (event: any): void => {
    this.confirm = DialogUtility.confirm({
      title: ' Xác nhận',
      content: "Ủy quyền cho [] tiếp tục quy trình!",
      okButton: {
        text: 'Đồng ý',
        click: this.okClick.bind(this),
        cssClass: "btn-outline-warning", icon: "feather-check-circle"
      },
      cancelButton: { text: 'Hủy', },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: 'Zoom' },
      position: {
        X: "center",
        Y: "center"
      },
    });
  }

  okClick(event: any): void {
    this.commonHttpRequestService.commonPostRequest("onReassign", this.authServices.serverModel.onReassign!, { nodeId: this.nodeId, employeeId: this.employeeSelected.id }).subscribe((res: any) => {
      this.actionMessage(res);
      this.confirm.hide()
      this.ejDialog.hide();
      this.allowDialog = false;
      this.controlServices.needLoad.next(true);
    })
  }

  onSelectRow(event: any) {
    this.employeeSelected = event.data
  }

  public hideDialog() {
    this.ejDialog.hide();
    this.allowDialog = false;
  }
  public onOpenDialog() {
    this.ejDialog.show();
  }
  public animationSettings: Object = { effect: 'Zoom', duration: 400, delay: 0 };

}
