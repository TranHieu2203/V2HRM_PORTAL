import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Configs } from 'src/app/common/configs';
import { Globals } from 'src/app/common/globals';
import { TranslationLoaderService } from 'src/app/common/translation-loader.service';
import { locale as english } from "src/assets/i18n/en";
import { locale as vietnam } from "src/assets/i18n/vi";

@Component({
  selector: 'hr-process-button',
  templateUrl: './hr-process-button.component.html',
  styleUrls: ['./hr-process-button.component.css']
})
export class HrProcessButtonComponent implements OnInit {

  //SEND|CANCEL|APPROVE|REJECT|SUBMIT|SEND_BACK|BREAK|REASSIGN
  public lstButton: any = [
    {
      id: "[SEND]",
      text: "[SEND]",
      function: this.onSend,
      class: "btn-warning",
      icon: "feather-send"
    },
    {
      id: "[CANCEL]",
      text: "[CANCEL]",
      function: this.onCancel,
      class: "btn-outline-warning",
      icon: "feather-x-circle"
    },
    {
      id: "[APPROVE]",
      text: "[APPROVE]",
      function: this.onApprove,
      class: "btn-outline-warning",
      icon: "feather-user-check"
    },
    {
      id: "[REJECT]",
      text: "[REJECT]",
      function: this.onReject,
      class: "btn-outline-warning",
      icon: "feather-user-x"
    },
    {
      id: "[SUBMIT]",
      text: "[SUBMIT]",
      function: this.onSubmit,
      class: "btn-outline-warning",
      icon: "feather-check-circle"
    },
    {
      id: "[SEND_BACK]",
      text: "[SEND_BACK]",
      function: this.onSend_Back,
      class: "btn-outline-secondary",
      icon: "feather-skip-back"
    },
    {
      id: "[BREAK]",
      text: "[BREAK]",
      function: this.onBreak,
      class: "btn-outline-dark",
      icon: "feather-skip-forward"
    },
    {
      id: "[REASSIGN]",
      text: "[REASSIGN]",
      function: this.onReassign,
      class: "btn-outline-warning",
      icon: "feather-search"
    },
  ]
  languages!: any;

  constructor(protected translationLoaderService: TranslationLoaderService,
    protected _translateService: TranslateService,
    protected globals: Globals,
    public configs: Configs,

  ) {
    this.languages = this.globals.currentLang;
    this._translateService.use(this.languages);
    this.translationLoaderService.loadTranslations(vietnam, english);


  }

  ngOnInit() {
  }
  onSend() {
    console.log(this.onSend)
  }
  onCancel() {
    console.log(this.onCancel)
  }
  onApprove() {

    console.log(this.onApprove)
  }
  onReject() {
    console.log(this.onReject)
  }
  onSubmit() {
    console.log(this.onSubmit)
  }
  onSend_Back() {
    console.log(this.onSend_Back)
  }
  onBreak() {
    console.log(this.onBreak)
  }

  onReassign() {
    console.log(this.onReassign)
  }

}
