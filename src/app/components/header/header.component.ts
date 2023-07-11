import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { HeaderService } from 'src/app/services/header.service';
import { ITaskCard } from '../task-card/task-card.component';
import { Subscription } from 'rxjs';

import { ModulesService } from 'src/app/services/modules.service';

import { IModule } from 'src/app/components/modules/modules.component';

const moduleRouterLink = [{ outlets: { ppMain: ['modules'] } }]

const colors: string[][] = [
  ['bg-red-gradiant-1', 'bg-red-gradiant-2', 'bg-red-gradiant-3', 'bg-red-gradiant-4'],
  ['bg-green-gradiant-1', 'bg-green-gradiant-2', 'bg-green-gradiant-3', 'bg-green-gradiant-4'],
  ['bg-yellow-gradiant-1', 'bg-yellow-gradiant-2', 'bg-yellow-gradiant-3', 'bg-yellow-gradiant-4'],
  ['bg-blue-gradiant-1', 'bg-blue-gradiant-2', 'bg-blue-gradiant-3', 'bg-blue-gradiant-4'],
  ['bg-red-gradiant-1', 'bg-red-gradiant-2', 'bg-red-gradiant-3', 'bg-red-gradiant-4'],
]
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('webButton') webButton!: ElementRef;
  @ViewChild('mobButton') mobButton!: ElementRef;
  @ViewChild('searcher') searcher!: ElementRef;

  isOpen: boolean = true;
  isNoti: boolean = false;

  moduleRouterLink!: any[];
  activeModule!: IModule | null;

  
  randomAvatarSrc: string = this.randomAvatarService.get();

  navClass?: string;
  buttonClass?: string;
  searchClass = `${this.headerService.searchActive ? " show" : ""}`
  notiClass = `${this.isNoti ? " show" : ""}`

  keyword: string = this.headerService.keyword;
  searchActive: boolean = this.headerService.searchActive;

  avatar!: string;

  modulesServiceActiveModuleSubscription!: Subscription;
  authServiceAuthenticatedSubscription!: Subscription;
  menuServiceIsOpenSubscription!: Subscription;
  articleServiceArticles$Subscription!: Subscription;
  articleServiceGetArticlesSubscription!: Subscription;
  chatMembers: any[] = [];
  topMembers: any[] = [];

  toggleActive(): void {
    this.headerService.searchActive = !this.headerService.searchActive;
  }

  toggleOpen(): void {
    this.menuService.toogleOpen();
  }

  toggleIsNoti(): void {
    this.isNoti = !this.isNoti;
  }

  handleCloseHeader(): void {
    this.headerService.searchActive = false;
  }

  bgClass(columIndex: number, index: number): string {
    return colors[columIndex][index % 4];
  }

  myTasks!: ITaskCard[];

  constructor(
    private randomAvatarService: RandomAvatarService,
    private menuService: MenuService,
    private headerService: HeaderService,
    public authService: AuthService,
    private modulesService: ModulesService,
  ) { }

  ngOnInit(): void {
    this.moduleRouterLink = moduleRouterLink;
    this.modulesServiceActiveModuleSubscription = this.modulesService.activeModule.subscribe((value: IModule | null) => {
      this.activeModule = value;
    })
    this.menuServiceIsOpenSubscription =
      this.menuService.isOpen.subscribe((value: boolean) => {
        this.isOpen = value;
        this.buttonClass = value ? " active" : "";
        this.navClass = value ? " nav-active" : "";
      });
    

    this.avatar = this.authService.avatar;

    const today = new Date();

    const yesterdayTaskTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0).getTime() - 1;
    let yesterdayTaskDateTime = new Date(yesterdayTaskTime);
    yesterdayTaskDateTime = new Date(yesterdayTaskDateTime.getFullYear(), yesterdayTaskDateTime.getMonth(), yesterdayTaskDateTime.getDate(), 9, 19, 0);

    const tomorrowTaskTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999).getTime() + 1;
    let tomorrowTaskDateTime = new Date(tomorrowTaskTime);
    tomorrowTaskDateTime = new Date(tomorrowTaskDateTime.getFullYear(), tomorrowTaskDateTime.getMonth(), tomorrowTaskDateTime.getDate(), 9, 19, 0);

    const theDayAfterTomorrowTaskTime = new Date(tomorrowTaskDateTime.getFullYear(), tomorrowTaskDateTime.getMonth(), tomorrowTaskDateTime.getDate(), 23, 59, 59, 999).getTime() + 1;
    let theDayAfterTomorrowTaskDateTime = new Date(theDayAfterTomorrowTaskTime);
    theDayAfterTomorrowTaskDateTime = new Date(theDayAfterTomorrowTaskDateTime.getFullYear(), theDayAfterTomorrowTaskDateTime.getMonth(), theDayAfterTomorrowTaskDateTime.getDate(), 9, 19, 0);

    const inTwoDayTaskTime = new Date(theDayAfterTomorrowTaskDateTime.getFullYear(), theDayAfterTomorrowTaskDateTime.getMonth(), theDayAfterTomorrowTaskDateTime.getDate(), 23, 59, 59, 999).getTime() + 1;
    let inTwoDayTaskDateTime = new Date(inTwoDayTaskTime);
    inTwoDayTaskDateTime = new Date(inTwoDayTaskDateTime.getFullYear(), inTwoDayTaskDateTime.getMonth(), inTwoDayTaskDateTime.getDate(), 9, 19, 0);

    this.chatMembers = [
      {
        imageUrl:"https://scontent.fhan14-3.fna.fbcdn.net/v/t1.18169-9/27332319_1348363645296437_1552865183192937450_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=zos5zZZQviUAX8EaomQ&_nc_ht=scontent.fhan14-3.fna&oh=00_AfCjOuDqQEEhVPmgfl34Y8NEK-Dl_OXAcw5M2DZ9bIcPMQ&oe=64CB0895",
        name:"Phan Tuấn Anh",
        org:"VDX"
      },
      {
        imageUrl:this.randomAvatarService.get(),
        name:"Tống Thanh Sơn",
        org:"DU10"
      },  {
        imageUrl:this.randomAvatarService.get(),
        name:"Lê Quỳnh Chi",
        org:"VAI"
      }, 
      {
        imageUrl:this.randomAvatarService.get(),
        name:"Trần Phan Linh",
        org:"DU13"
      },  {
        imageUrl:this.randomAvatarService.get(),
        name:"Nguyễn Việt Hải",
        org:"R&D"
      },  {
        imageUrl:this.randomAvatarService.get(),
        name:"Phan Lệ Chi",
        org:"IT"
      },  {
        imageUrl:this.randomAvatarService.get(),
        name:"Đặng Xuân Hồng",
        org:"Takumi"
      },  {
        imageUrl:this.randomAvatarService.get(),
        name:"Nguyễn Văn Nam",
        org:"BA"
      },  {
        imageUrl:this.randomAvatarService.get(),
        name:"Trần Văn Đức",
        org:"DU13"
      }, 
    ]

    this.topMembers = [
      {
        imageUrl:this.randomAvatarService.get(),
        name:"Phan Tuấn Anh",
      },
      {
        imageUrl:this.randomAvatarService.get(),
        name:"Tống Thanh Sơn",
        org:"DU10"
      },  {
        imageUrl:this.randomAvatarService.get(),
        name:"Lê Quỳnh Chi",
        org:"VAI"
      },  {
        imageUrl:this.randomAvatarService.get(),
        name:"Phạm Thanh Lam",
        org:"DU18"
      },  {
        imageUrl:this.randomAvatarService.get(),
        name:"Trần Tuấn Anh",
        org:"DU13"
      },  {
        imageUrl:this.randomAvatarService.get(),
        name:"Phan Đức Bảo",
        org:"DU13"
      },
    ]

    const todayTaskDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours() + 1, 19, 0);

    this.myTasks = [
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Thiết kế APP IPortal',
        dueDate: yesterdayTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Viết Login back-end IPortal',
        dueDate: todayTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Viết Login front-end IPortal',
        dueDate: todayTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng Layout front-end IPortal',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng menu front-end IPortal',
        dueDate: inTwoDayTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng Layout front-end IPortal',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng menu front-end IPortal',
        dueDate: inTwoDayTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng Layout front-end IPortal',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng menu front-end IPortal',
        dueDate: inTwoDayTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng Layout front-end IPortal',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng menu front-end IPortal',
        dueDate: inTwoDayTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng Layout front-end IPortal',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng menu front-end IPortal',
        dueDate: inTwoDayTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng Layout front-end IPortal',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng menu front-end IPortal',
        dueDate: inTwoDayTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng Layout front-end IPortal',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['VMO DX', 'Dự án triển khai HRM'],
        title: 'Dựng menu front-end IPortal',
        dueDate: inTwoDayTaskDateTime,
      },
    ]

  }
  logout(){
    this.authService.logout()
  }

  ngAfterViewInit(): void {

  
  }

  ngOnDestroy(): void {
    if(this.authServiceAuthenticatedSubscription)this.authServiceAuthenticatedSubscription.unsubscribe();
    if(this.menuServiceIsOpenSubscription)this.menuServiceIsOpenSubscription.unsubscribe();
  }

}
