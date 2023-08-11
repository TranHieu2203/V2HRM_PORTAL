import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { RandomImageService } from 'src/app/services/random-image.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { fromEvent, Observable } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';
import { Globals } from "src/app/common/globals";
import { Home } from 'src/app/model/home';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';


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

  ngOnInit(): void {
    this.postimage1 = "/assets/images/demo/1.png";
    this.postimage2 = "/assets/images/demo/2.png";
    this.postimage3 = "/assets/images/demo/3.png";
    this.postimage4 = "/assets/images/demo/4.png";
    this.postimage5 = "/assets/images/demo/5.png";
    this.getData();
    this.getdashboard();



    this.survey = [
      { name: "Đồ chơi", check: true, total: 121 },
      { name: "Tổ chức dã ngoại", check: false, total: 425 },
      { name: "Sách thiếu nhi", check: false, total: 571 },
    ]
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
      console.log(data)

      // {
      //   imageUrl: "https://scontent.fhan14-3.fna.fbcdn.net/v/t1.18169-9/27332319_1348363645296437_1552865183192937450_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=zos5zZZQviUAX8EaomQ&_nc_ht=scontent.fhan14-3.fna&oh=00_AfCjOuDqQEEhVPmgfl34Y8NEK-Dl_OXAcw5M2DZ9bIcPMQ&oe=64CB0895",
      //   name: "Phan Tuấn Anh",
      //   org: "VDX"
      // },

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
          tn: element.JOIN_DATE
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
