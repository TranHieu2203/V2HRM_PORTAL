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
  data:any;
  resizer$!: Observable<any>;
  model: Home = new Home();
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private headerService: HeaderService,
    private randomAvatarService: RandomAvatarService, 
    private randomImageService: RandomImageService,
    private commomHttpService: CommonHttpRequestService,
    private globals: Globals,
    private _sanitizer: DomSanitizer
    ) {
    this.randomAvatarSrc1 = "https://news.vmogroup.com/wp-content/uploads/2023/04/VMO_Logo_Positive.png"
    this.randomAvatarSrc2 = "https://news.vmogroup.com/wp-content/uploads/2023/04/VMO_Logo_Positive.png"
    this.randomAvatarSrc3 = "https://news.vmogroup.com/wp-content/uploads/2023/04/VMO_Logo_Positive.png"
    this.randomAvatarSrc4 = "https://news.vmogroup.com/wp-content/uploads/2023/04/VMO_Logo_Positive.png"
    this.randomAvatarSrc5 = "https://news.vmogroup.com/wp-content/uploads/2023/04/VMO_Logo_Positive.png"
    
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
          if(item.createDate != null && item.updateDate == null){
            item.updateDate = this.formatDate(item.createDate.toString())
          }
          else{
            item.updateDate = this.formatDate(item.updateDate.toString())
          }
          
          item.imgUrl = this.globals.apiUrlFileManager.toString().replace("api/","") + item.imgUrl;
          
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
