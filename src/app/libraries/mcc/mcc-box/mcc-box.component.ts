import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MccState } from '../mcc-state';

@Component({
  selector: 'app-mcc-box',
  templateUrl: './mcc-box.component.html',
  styleUrls: ['./mcc-box.component.scss']
})
export class MccBoxComponent implements OnInit, OnDestroy {

  // <i #icon ... ></i>
  @ViewChild('icon') icon!: ElementRef;
  @ViewChild('inputcontainer') inputcontainer!: ElementRef;

  width!: number;

  fieldName!: string;
  displayString!: string;
  color = '';
  placeholder!: string;
  isOpen!: boolean;
  mccStateIsOpenSubscription!: Subscription
  mccStateDisplayStringSubscription!: Subscription

  constructor(private mccState: MccState) {
    this.fieldName = mccState.fieldName;
  }

  ngOnInit(): void {
    this.placeholder = this.mccState.placeholder;
    this.mccStateIsOpenSubscription = this.mccState.isOpen.subscribe(x => this.isOpen = x)
    this.mccStateDisplayStringSubscription = this.mccState.displayString.subscribe(x => this.displayString = x);
    if (this.inputcontainer) this.width = this.inputcontainer.nativeElement.width;
  }

  ngOnDestroy(): void {
    this.mccStateIsOpenSubscription.unsubscribe();
    this.mccStateDisplayStringSubscription.unsubscribe();
  }

  toogleOpen(): void {

    const el = this.icon.nativeElement;
    el.style.animation = 'none';
    el.offsetHeight;  /* trigger reflow */
    el.style.animation = null;

    this.mccState.isOpen.next(!this.mccState.isOpen.value);

  }

}
