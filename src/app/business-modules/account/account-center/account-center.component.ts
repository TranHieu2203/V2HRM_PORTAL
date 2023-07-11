import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { AccountService } from '../account.service';

interface ITab {
  index: number,
  routerLink: string,
  linkText: string,
}

@Component({
  selector: 'app-account-center',
  templateUrl: './account-center.component.html',
  styleUrls: ['./account-center.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountCenterComponent implements OnInit {

  fullname!: string;
  avatar!: string;
  activeTabIndex!: number;
  activeClass: string = '';

  routerEventsSubscription!: Subscription;

  tabs: ITab[] = [
    {
      index: 0,
      routerLink: "main",
      linkText: "Sơ yếu lý lịch"
    },
    {
      index: 1,
      routerLink: "more",
      linkText: "Thông tin phụ"
    },
    {
      index: 2,
      routerLink: "education",
      linkText: "Trình độ văn hóa"
    },
    {
      index: 3,
      routerLink: "userbank",
      linkText: "Tài khoản ngân hàng"
    },
    {
      index: 4,
      routerLink: "situation",
      linkText: "Gia cảnh"
    },
    {
      index: 5,
      routerLink: "paper",
      linkText: "Giấy tờ cần nộp"
    },
    {
      index: 6,
      routerLink: "bonus",
      linkText: "Khen thưởng"
    },
    {
      index: 7,
      routerLink: "discipline",
      linkText: "Kỷ luật"
    },
    {
      index: 8,
      routerLink: "contract",
      linkText: "Hợp đồng"
    },
    {
      index: 9,
      routerLink: "working",
      linkText: "Quyết định thay đổi"
    },
    {
      index: 10,
      routerLink: "inschange",
      linkText: "Biến động bảo hiểm",
    },
  ]


  constructor(
    private authService: AuthService,
    private router: Router,
    private accountService: AccountService,
  ) {
    this.avatar = this.authService.avatar;
    this.activeTabIndex = this.accountService.activeTabIndex;
  }

  ngOnInit(): void {
    this.fullname = this.authService.auth.data.fullname;
    if (this.authService.auth.data.avatar) this.avatar = this.authService.auth.data.avatar;

    this.routerEventsSubscription = this.router.events.subscribe(x => {
      if (x instanceof NavigationStart) {
        console.log("x", x)
        const arr = x.url?.split('/');
        if (arr.length >2 ) {
          const path = arr[2];
          console.log("path", path);
          this.activeTabIndex = this.tabs.filter(t => t.routerLink === path)[0].index;
          this.accountService.activeTabIndex = this.activeTabIndex;
        }
      }
    })

  }

  getActive(index: number): string {
    return index === this.activeTabIndex ? "--active" : "";
  }

}
