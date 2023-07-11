import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  isOpen = new BehaviorSubject<boolean>(false);

  constructor() { }

  toogleOpen() {
    this.isOpen.next(!this.isOpen.value);
  }

}
