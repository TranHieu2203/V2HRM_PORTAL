import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { L10n } from '@syncfusion/ej2-base';
import { Configs } from 'src/app/common/configs';
import { Globals } from 'src/app/common/globals';
import { TranslationLoaderService } from 'src/app/common/translation-loader.service';
import { locale as english } from "src/assets/i18n/en";
import { locale as vietnam } from "src/assets/i18n/vi";
import { ProcessTypeService } from '../_services/process-type.service';
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-angular-popups';
import { DropDownListModule, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  languages!: any;
  processTypes: any;
  public dialogHeader!: string;
  public animationSettings: Object = { effect: 'Zoom' };

  @ViewChild('defaultDialog')
  public defaultDialog!: DialogComponent;

  @ViewChild('saveProcessType')
  public saveProcessType!: DropDownListComponent;



  constructor(
    protected globals: Globals,
    public configs: Configs,
    protected translationLoaderService: TranslationLoaderService,
    protected _translateService: TranslateService,
    protected processTypeServices: ProcessTypeService,
    private commonHttpRequestService: CommonHttpRequestService,
    private authService: AuthService
  ) {
    L10n.load(this.configs.languageGrid);

  }

  ngOnInit() {
    this.languages = this.globals.currentLang;
    this._translateService.use(this.languages);
    this.translationLoaderService.loadTranslations(vietnam, english);

    // load data
    this.processTypeServices.processType.subscribe((res: any) => {
      this.processTypes = res;
    })

  }

  saveProcess() {

    var data: any = {
      SE_PROCESS_TEMPLATE_ID: this.saveProcessType.value
    }

    this.commonHttpRequestService.commonPostRequest("createHrProcess", this.authService.serverModel.createHrProcess!, data)
      .subscribe((res: any) => {
      })

  }

}
