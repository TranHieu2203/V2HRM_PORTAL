import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { RandomImageService } from 'src/app/services/random-image.service';

import { fromEvent, Observable } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';

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

  resizer$!: Observable<any>;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private headerService: HeaderService,
    private randomAvatarService: RandomAvatarService, 
    private randomImageService: RandomImageService,
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
    console.log("rec", rec)
    console.log("el.style", el.style)
    // this.testerLeft.nativeElement.style.width = `${rec.left}px`;
    const el1 = this.postCreator.nativeElement
    const rec1 = el1.getBoundingClientRect();
    const paddingLeft = (rec.width - rec1.width) / 2;
    // this.testerRight.nativeElement.style.left = `${rec.left + paddingLeft}px`;
    // this.testerRight.nativeElement.style.width = `${rec1.width}px`;

    this.headerService.searchLeft$.next(rec.left + paddingLeft);
    this.headerService.searchWidth$.next(rec1.width);
    
  }

}
