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
import { HrProcessService } from 'src/app/services/hr-process.service';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public headerText: Object[] = [];


  languages!: any;
  processTypes: any;
  public dialogHeader!: string;
  public animationSettings: Object = { effect: 'Zoom' };

  @ViewChild('defaultDialog')
  public defaultDialog!: DialogComponent;

  @ViewChild('saveProcessType')
  public saveProcessType!: DropDownListComponent;

  processData!: any;
  processDataKey!: any[];
  processDataGrid!: any;
  processSelected!: number;
  @ViewChild('tab')
  public tab!: TabComponent;

  public lst: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  constructor(
    protected globals: Globals,
    public configs: Configs,
    protected translationLoaderService: TranslationLoaderService,
    protected _translateService: TranslateService,
    protected processTypeServices: ProcessTypeService,
    private commonHttpRequestService: CommonHttpRequestService,
    private authService: AuthService,
    private hrProcessServices: HrProcessService,
    private router: ActivatedRoute,
    private router1: Router,

  ) {
    L10n.load(this.configs.languageGrid);
    this.router.queryParams
      .subscribe(params => {
        this.processSelected = params.processSelected;
      }
      );

  }

  ngOnInit() {
    this.languages = this.globals.currentLang;
    this._translateService.use(this.languages);
    this.translationLoaderService.loadTranslations(vietnam, english);

    // load data
    this.processTypeServices.processType.subscribe((res: any) => {
      this.processTypes = res;
      this.processTypes.forEach((element: any) => {
        console.log(element, this.processSelected)
        if (element.key.toString() == this.processSelected)
          element.checked = true
      });
    })

    this.hrProcessServices.processList$.subscribe((data) => {
      const groupedKeys = data.reduce((group: { [key: string]: any[] }, item: { process_Name: string | number; }) => {
        if (!group[item.process_Name]) {
          group[item.process_Name] = [];
        }
        group[item.process_Name].push(item);
        return group;
      }, {});
      this.processData = groupedKeys
      this.processDataKey = Object.keys(this.processData)
      this.lst.subscribe((value: any) => {
        if (value.length != 0) {
          this.hrProcessServices.getHrProcess(JSON.stringify(value.toString())).subscribe((data: any) => {
            console.log('dữ liệu trả về', data)
            this.processDataGrid = data.body.data
          })
        }

      })
    })
  }

  pushToList(event: any, value: string) {
    if (event) {
      this.lst.next(this.lst.getValue().concat([value]));
    } else {
      const roomArr: any[] = this.lst.getValue();

      roomArr.forEach((item, index) => {
        if (item === value) { roomArr.splice(index, 1); }
      });

      this.lst.next(roomArr);
    }

  }
  goToProcess(event: any) {
    console.log(event)
    this.router1.navigate(['hr-process/c-a'], { queryParams: { process: event.rowData.process_Id_Str, node: event.rowData.node_Id_Str } });
  }

  getCount(key: string) {
    if (this.processData[key] != undefined) { return this.processData[key]!.length } else return 0
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
