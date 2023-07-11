import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserActivityService } from 'src/app/services/user-activity.service';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';

@Component({
  selector: 'app-rightbar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.css']
})
export class RightbarComponent implements OnInit, OnDestroy {

  isOpen: boolean = false;
  width: number = 800;
  height: number = 182;
  chatMembers: any[] = [];
  topMembers: any[] = [];

  reloadFlag: boolean = false;
  userActivity: any[] = [];
  timerId?: any;
  menuClass: string = this.isOpen? " d-block" : "";
  activeSidebarClass?: string;
  randomAvatarSrc?: string;
  activeChatName?: string;

  constructor(private userActivityService: UserActivityService, private randomAvatarService: RandomAvatarService) { }

  ngOnInit(): void {

    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions)

    this.userActivityService.value.subscribe((value: any[]) => {
      this.userActivity = value;
    });

    // Regularly reload page each 30s
    this.timerId = setInterval(() => {
      this.reloadFlag = !this.reloadFlag;
    }, 30000)

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
  }

  ngOnDestroy(): void {
    window.removeEventListener("resize", this.updateDimensions)
    if (this.timerId) clearInterval(this.timerId);
  }

  updateDimensions = () => {
    if (window.innerWidth < 500) {
      this.width = 450;
      this.height = 102;
    } else {
      let update_width = window.innerWidth - 100
      let update_height = Math.round(update_width / 4.4)
      this.width = update_width;
      this.height = update_height;
    }

    this.activeSidebarClass = this.width > 1500 ? "active-sidebar" : "";
  }

  statusClass(time1: number, time2: number): string {
    const milisecondDiff = time2 - time1
    const minuteDiff = milisecondDiff / 60000
    if (minuteDiff < 0.5) {
      return 'bg-success'
    } else if (minuteDiff < 1) {
      return 'bg-warning'
    } else if (minuteDiff < 1.5) {
      return 'bg-warning'
    } else if (minuteDiff < 2) {
      return 'bg-danger'
    } else return 'bg-light'
  }

  toggleOpen(e: any = "Someone"): void {
    this.isOpen = !this.isOpen;
    this.menuClass = this.isOpen? " d-block" : "";
    this.randomAvatarSrc = this.randomAvatarService.get();
    this.activeChatName = e.target.innerText;
  }

}
