import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

// @ts-ignore
import { animation } from './animation.js';

@Component({
  selector: 'app-waitting-screen',
  templateUrl: './waitting-screen.component.html',
  styleUrls: ['./waitting-screen.component.css']
})
export class WaittingScreenComponent implements OnInit, AfterViewInit {

  @ViewChild('refCanvas') refCanvas!: ElementRef

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      animation(this.refCanvas.nativeElement);
  }

}
