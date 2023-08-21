import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { RandomImageService } from 'src/app/services/random-image.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { fromEvent, groupBy, Observable } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';
import { Globals } from "src/app/common/globals";
import { Home } from 'src/app/model/home';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { HrProcessService } from 'src/app/services/hr-process.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('middleColumn') middleColumn!: ElementRef;
  @ViewChild('testerLeft') testerLeft!: ElementRef;
  @ViewChild('testerRight') testerRight!: ElementRef;
  @ViewChild('postCreator') postCreator!: ElementRef;
  data: any;
  resizer$!: Observable<any>;
  model: Home = new Home();
  onboardMembers: any[] = [];
  topMembers: any[] = [];
  survey: any[] = [];
  public cellSpacing: number[] = [10, 10];
  public cellAspectRatio: number = 100 / 50;

  constructor(
    private authService: AuthService,
    private router: Router,
    private headerService: HeaderService,
    private randomAvatarService: RandomAvatarService,
    private randomImageService: RandomImageService,
    private commomHttpService: CommonHttpRequestService,
    private globals: Globals,
    private _sanitizer: DomSanitizer,
    protected translate: TranslateService,
    private hrProcessServices: HrProcessService

  ) {
    translate.setDefaultLang('vi');
    translate.use('vi');
  }

  postimage1?: string;
  postimage2?: string;
  postimage3?: string;
  postimage4?: string;
  postimage5?: string;

  randomAvatarSrc1?: string;
  randomAvatarSrc2?: string;
  randomAvatarSrc3?: string;
  randomAvatarSrc4?: string;
  randomAvatarSrc5?: string;

  processData!: any;
  processDataKey!: any[];

  ngOnInit(): void {
    this.getData();
    this.getdashboard();



    this.survey = [
      { name: "Đồ chơi", check: true, total: 121 },
      { name: "Tổ chức dã ngoại", check: false, total: 425 },
      { name: "Sách thiếu nhi", check: false, total: 571 },
    ]

    // employee proces

    this.hrProcessServices.processList$.subscribe((data: any) => {
      // group lại theo loại quy trình
      const groupedKeys = data.reduce((group: { [key: string]: any[] }, item: { process_Name: string | number; }) => {
        if (!group[item.process_Name]) {
          group[item.process_Name] = [];
        }
        group[item.process_Name].push(item);
        return group;
      }, {});
      this.processData = groupedKeys
      this.processDataKey = Object.keys(this.processData)
      console.log(this.processData)
    })

  }
  log(val: any) {
    console.log(val)
  }
  getColumn() {
    if (this.processDataKey.length >= 2) { return 2 } else { return 1; }

  }

  ngAfterViewInit(): void {

    this.resizer$ = fromEvent(window, 'resize', e => e)
    this.resizer$.subscribe(_ => {
      this.setTesters();
    })

    this.setTesters();

  }

  logout() {
    this.authService.logout();
  }

  setTesters() {
    const el = this.middleColumn.nativeElement;
    const rec = el.getBoundingClientRect();

    // this.testerLeft.nativeElement.style.width = `${rec.left}px`;
    const el1 = this.postCreator.nativeElement
    const rec1 = el1.getBoundingClientRect();
    const paddingLeft = (rec.width - rec1.width) / 2;
    // this.testerRight.nativeElement.style.left = `${rec.left + paddingLeft}px`;
    // this.testerRight.nativeElement.style.width = `${rec1.width}px`;

    this.headerService.searchLeft$.next(rec.left + paddingLeft);
    this.headerService.searchWidth$.next(rec1.width);

  }
  formatStt = (index: string) => {
    return (
      parseInt(index, 0) +
      1
    );
  };
  goToProcess(event: any) {
    console.log(event.rowData)
    this.router.navigate(['hr-process/c-a'], { queryParams: { process: event.rowData.process_Id_Str, node: event.rowData.node_Id_Str } });
  }
  getData() {
    this.commomHttpService
      .commonGetRequest(
        'laythongtin',
        'hr/BlogInternal/ListHome'
      )
      .subscribe((res: any) => {
        this.data = res.body.data;
        for (const item of this.data) {
          item.avater = this.randomAvatarSrc1;
          if (item.createDate != null && item.updateDate == null) {
            item.updateDate = this.formatDate(item.createDate.toString())
          }
          else {
            item.updateDate = this.formatDate(item.updateDate.toString())
          }

          item.imgUrl = this.globals.apiUrlFileManager.toString().replace("api/", "") + item.imgUrl;

        }

      });


  }

  getdashboard() {
    this.commomHttpService.commonGetRequest("GetDashboardInfo", 'hr/BlogInternal/GetDashboardInfo').subscribe((dashboardInfo: any) => {
      // let data = JSON.parse(dashboardInfo.body)
      let data = (JSON.parse(dashboardInfo.body.message).Data)

      data.Table.forEach((element: any) => {
        let obj = {
          imageUrl: element.AVATAR,
          name: element.EMPLOYEE_NAME,
          org: element.ORG_NAME
        }
        this.onboardMembers.push(obj)
      });
      data.Table1.forEach((element: any) => {
        let obj = {
          imageUrl: element.AVATAR,
          name: element.EMPLOYEE_NAME,
          org: element.ORG_NAME,
          tn: element.SENIORITY
        }
        this.topMembers.push(obj)
      });
    })
  }

  formatDate(dateString: string): string {
    const dateObject = new Date(dateString);
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
    const year = dateObject.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }

}
