import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Behavior } from 'popper.js';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  processId!: number;
  needLoad: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);



  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(value => {
      this.processId = value.processId
    })
    console.log(this.processId)
  }

}
