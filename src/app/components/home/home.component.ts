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
  chatMembers: any[] = [];
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
    this.randomAvatarSrc1 = "https://news.vmogroup.com/wp-content/uploads/2023/04/VMO_Logo_Positive.png"
    this.randomAvatarSrc2 = "https://news.vmogroup.com/wp-content/uploads/2023/04/VMO_Logo_Positive.png"
    this.randomAvatarSrc3 = "https://news.vmogroup.com/wp-content/uploads/2023/04/VMO_Logo_Positive.png"
    this.randomAvatarSrc4 = "https://news.vmogroup.com/wp-content/uploads/2023/04/VMO_Logo_Positive.png"
    this.randomAvatarSrc5 = "https://news.vmogroup.com/wp-content/uploads/2023/04/VMO_Logo_Positive.png"
    translate.setDefaultLang('vi');
    translate.use('vi');
    this.translate.get("[Tên đăng nhập]").subscribe((d:any)=>{
      console.log(d)
    })
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
    this.chatMembers = [
      {
        imageUrl: "https://scontent.fhan14-3.fna.fbcdn.net/v/t1.18169-9/27332319_1348363645296437_1552865183192937450_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=zos5zZZQviUAX8EaomQ&_nc_ht=scontent.fhan14-3.fna&oh=00_AfCjOuDqQEEhVPmgfl34Y8NEK-Dl_OXAcw5M2DZ9bIcPMQ&oe=64CB0895",
        name: "Phan Tuấn Anh",
        org: "VDX"
      },
      {
        imageUrl: "https://scontent.fhan3-5.fna.fbcdn.net/v/t39.30808-1/344358236_3134789560153719_2095977137332141775_n.jpg?stp=c51.0.200.200a_dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=uhXOWUSzEVcAX_PUwN1&_nc_oc=AQmfA1pSeBI34cSP1sKdksuRB5k4_5606ikg9vcppeJyQnY1BzKddJAt9TvVXvSM0l8&_nc_ht=scontent.fhan3-5.fna&oh=00_AfA6D9usid84KEd5FYOzIbcTZyhryiGXZR54xQiAU9HOEg&oe=64C477F6",
        name: "Tống Thanh Sơn",
        org: "DU10"
      }, {
        imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHgAYAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAFBgMEAAIHAf/EADcQAAIBAwIDBQYFAwUBAAAAAAECAwAEEQUhEjFBBhMiUWFCcYGRobEjMnLB8BTR4QczUoKiJP/EABkBAAMBAQEAAAAAAAAAAAAAAAIDBAEABf/EACARAAICAgICAwAAAAAAAAAAAAABAhEDIRIxEyIEMkH/2gAMAwEAAhEDEQA/AFfTlzcMfJaJBaqaWvikPuq/jesMRqV2qldFUGWOB51cmkSGJpJDhVGTSteXct5Nnfhz4UrUjmTz3W+IhxdK0WeThJIU4rZbUwxhn5t0860dQkW3OutG8Qvo9paahbuZtRjhnHsMoA+9WJOz90PFEUdOjK2aHaZoktxGsjDAO+fjii97o2q2VkJtNMrZGWCtzoXJX2F45VbQIuLSe2YiWMgeY5VEBvRbRdSl1kNZXwV5o1wA2Ec/HHOquoWLWcpU5K81J5keR9aKwK/Sk6jzzWKtemvVFaDYV0sfgufN/wBqtnaoNPGLRfUk/WvbucW9u8reyNqEID6/dcbi2Q+Fd29T/iqunQjj7xhk8lHnUKh7icb5Z23P3NO+kWCpYQzcC5lIwT0HT9s/Gtm+MQsceUgNJYyGMSSDGGAXPMk1XaxJMcYG74Zs+XKmbUI1AjiOzYJCDc5I/wAVBBbFpiwGyRIPPJ4c5+o+dI5MsWNMKwW3c2saBMAAGidlOO6WNtivLNQNwRWimQhSQOZ8qjtJ45CSpDY6CgoJ7FztPps9jqaazYxDjBy4A2PvrTWLhLyyiliyQVDqzcyh3HxG4PuozresxWyBYhxEj8mMg0q29z37SJJF3PCchOgRic/U/WmxeieUVZQY4qB5SwwNhUs/hJ9BVZAWIpxM9aGe28NrH+kGhPaC4wEgH6m/ai+QkSg+ytKmoTme8dvXArkcybTozLdxxKcNKwjB6jPM/KunAxCOOC2CxxRxcRc7BRyB+5pD7Hxq2rIGzxHY49lPaPvI8I/VT5qvAQI5AF70jiTGOXJT6fz0ocmxmIpvJHIZLkoyxquFzkHlsfl8qFQf1lxaslr+EshJL9SNth9Km1CeNoltoydxkluZGfL1rLa21CW0VbRhEueEytyQYGceuwpLK4rQM1aC2gVHv7494w/289PPFE+zahp0Fu2Y2wCc9KqTaDFJbKs0RbDEiXiw0nqfT+3zYeyWkxRShiOFEyzAcs1rquwFabbQF7RWktlqUioAcrmMsNs+VKlsLldQf+r3Lxt12zzH2Fdr1zQotQsBwgRzKOJWA5H1rm+qWjRq6zIFmiO4/npWp1oCue0xYml43cZ/ma1U4J8ulQKcynJ2J50V06DEkrZJwoCnHI56bH7U9LRLJ7Lmp3PdW7EczsKVmOT6nnRXWZi0qxjkBkihLjBrkcHOzFy9vdhxx5JwvCORPX1/h6UxavqTXF1FDIjAnAK8W4H/ABz5kjHwPlSzptxHaxLJ7Y655eZ9/wDOdZDqEj3T3kp8XCcA9BjAHyoWg4ugjbXTTX0xk2YDiCgeuB9hXR+z6QzaNArr4QvPzJ3/AJ7q49ZTsL4TSE4c7k103snIbmw7hmIEZ2A60nIqZVifKFMKXVpAzbOBirWnJGkka8WYwctjrUb6fGfP51NDZxQJxF2X40vYyTjRX1vtULeZoLa3kce1IRstJF3dSXc0zzKQzefPGKZtf7Q2Wng26SSXFwy7IpJ4ffik281q/vb4PdRyBDsO8XGFAo1bZyhxjaQpM3DPIudgxxTJp2P6Z2JHiKjpvsfMilZSWYseu9NenbWEWDjLHz8h6GqUeawBcsXuXJqCb/cH6RU0/huG8jiq2csSeQrTTYPnCH8p3O9WVVpreZkUnC8bcPT+ZqoIpmRnjikZepVCQPjTD2bDSWcseEKyq0bFugIx+4oZOgopt0LzI0ccUxOz8QGD1B3+4+dPPYbW41HdO3DIpzg+0KTbgNHEbdgd24wPJhlT9voK0sOLvcqSGB2IrJRUkFjk4M70tzG6BlYEGo7iFb2PunJCH82DjNc407UtQgQBZeJfJxmjlt2luoF4pIVYDn4sVM00WJWrQavdCijhKaeiW6jfCjn6mlTVNPmtre4e4dWxG3izy2qxJ/qRauGja0uEI2z4SPvSvrnaZ9URoYI2jjb87OfEw8sDkKKMJX0c/k+nFyAEYwKZbZlWCFeoBOMf2IPSl8Lsh86M/wDEZ5LVSPOYNvCApJHPrT12L7EQPBHf60jSM44o7QAnA6F/X0+fkBPYXQxr/aOJZk4rS0HezZ9o+yvxP0BruKoFUKqgAdAMUubb0g40tsWp7eGOERxW7xoowFVMAD3Umatp0dvcNNDHtICJEHhLf5rpd8ABSnrQDRNU7TRXjfLRy/WjHP8AjREk8RLDGCre0CPfg/8AY0OtnWK5Dn8p3NGO1VosN1HOgx3oIb3j/FBc/h4Kqd8g9api7iTTTjJjpZRq8YI3BGc1Ldw4t2x5UB7O6n3ci28x8JPgPl6UyamwTTp5AdhGT9KnmmpF2OSlCxAjjEhnck4U7fOsFu7MiRjiZlzgVpA2FYefOrkIkQxNEclsoCPXaqjzzVbaZYlZopAitksVwP5vRFTk5HKiczCS8a14A6xQ8I2yCcf3q9B2Wne3EnfKjEZC4NB5EuwvE2tDb/pfaw6b2eWZwTdXrd8wUZPDyT/zv8acZLrgTi7mUj9NeafZw2NrHb26BEjQKPgKknbCGs3R2gFqGocRPFFIvvFLuozCReu5o9qD5Jpc1E7j30hsqxpCd2wfAt16cRztnbFLci8MjBccOTimjW7cXd7DEWwOBmPwpWhBI4AeZp+N+tCM32s0zwtTDZalNfWEtpIwZihGcHPKgEq8jUtjObe4VwduvqKOSTAhJxZWTbNXtPlI/DBw2eKM+TVSIxJitkYq3u5VrAWmOPYyNL/tHaWhB4WXicnrj+fWuxT28EcPCvCgH1rinYq6/pu09g/ISSlMjoHGPvXbmhiIPEuQu5J3yaS1sa3pFqq10wCHcZrKytl0BHsXr05Jpe1A+IV7WUh9lkACFWXWVRzgGJx9KT7mIQyYUnh2OfQivKyn4xGU2ukHdK49sZI8jyP1qqvSsrKahJ5J+es9qsrK4EL6BP3WqWTHnHcRnP8A2H7V3n/6ZlxlY05nqayspU1sZF6P/9k=",
        name: "Lê Quỳnh Chi",
        org: "VAI"
      },
      {
        imageUrl: "data:image/jpeg;base64,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",
        name: "Trần Phan Linh",
        org: "DU13"
      }, 
      {
        imageUrl: "https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/275427027_4883771765075324_2611239860466520994_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_ohc=SbmD6IrLlJsAX9ozEvy&_nc_ht=scontent.fhan3-4.fna&oh=00_AfDumn8rVLdzEjXlwoqWpB0hcWAa77nE-L_aNsKrbRlksw&oe=64C47D69",
        name: "Đặng Xuân Hồng",
        org: "Takumi"
      }
    ]

    this.topMembers = [
      {
        imageUrl: "data:image/jpeg;base64,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",
        name: "Phan Tuấn Anh",
      },
      {
        imageUrl: this.randomAvatarService.get(),
        name: "Tống Thanh Sơn",
        org: "DU10"
      }, {
        imageUrl: this.randomAvatarService.get(),
        name: "Lê Quỳnh Chi",
        org: "VAI"
      }, {
        imageUrl: this.randomAvatarService.get(),
        name: "Phạm Thanh Lam",
        org: "DU18"
      }, {
        imageUrl: this.randomAvatarService.get(),
        name: "Trần Tuấn Anh",
        org: "DU13"
      }, {
        imageUrl: this.randomAvatarService.get(),
        name: "Phan Đức Bảo",
        org: "DU13"
      },
    ]

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
