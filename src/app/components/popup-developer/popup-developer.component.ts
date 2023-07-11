import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-developer',
  templateUrl: './popup-developer.component.html',
  styleUrls: ['./popup-developer.component.css']
})
export class PopupDeveloperComponent implements OnInit, OnDestroy {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.timerId = setInterval(() => {
      this.reloadFlag = !this.reloadFlag;
    }, 30000)

  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
  }

  toggleOpen(): void {
    this.router.navigate([{ outlets: { developer: null }}]);
  }

  timerId?: any;
  reloadFlag: boolean = false;

}
