import { ContractComponent } from './../../account/contract/contract.component';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ControlService } from '../_services/control.service';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from 'src/app/common/globals';
import { Configs } from 'src/app/common/configs';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslationLoaderService } from 'src/app/common/translation-loader.service';
import { locale as english } from "src/assets/i18n/en";
import { locale as vietnam } from "src/assets/i18n/vi";

@Component({
  selector: 'process-view',
  templateUrl: './process-view.component.html',
  styleUrls: ['./process-view.component.scss']
})
export class ProcessViewComponent implements OnInit, AfterViewInit {
  @Input() public selectedDosing: any;
  @ViewChild('stepper') stepper!: MatStepper;
  public processing: boolean = true;
  public selectIndex: number = 0;
  public history:any;
  languages!: any;

  constructor(    protected translationLoaderService: TranslationLoaderService,
    protected _translateService: TranslateService,
    protected globals: Globals,
    public configs: Configs,
    private controlServices: ControlService,
) {
  this.languages = this.globals.currentLang;
  this._translateService.use(this.languages);
  this.translationLoaderService.loadTranslations(vietnam, english);

 }

  ngOnInit() {
    this.controlServices.nodeId$.subscribe(value => {
      this.selectedDosing.forEach((data: any, index: any) => {
        if (data.nodeId == value) this.selectIndex = index
      });

    })
    this.controlServices.GetHistory().subscribe((value)=>{
      this.history = value.body
      console.log(value,"history")
    })
  }
  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => '';
  }
}
