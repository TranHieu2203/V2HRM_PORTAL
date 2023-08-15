import { Injectable } from '@angular/core';
import { Behavior } from 'popper.js';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  needLoad: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

}
