import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  keyword: string = "";
  searchActive: boolean = false;
  searchLeft$!: BehaviorSubject<number>;
  searchWidth$!: BehaviorSubject<number>;

  toggleActive(keyword: string, searchActive: boolean): void {
    this.keyword = keyword;
    this.searchActive = searchActive;
  }

  constructor() {
    this.searchLeft$ = new BehaviorSubject<number>(0);
    this.searchWidth$ = new BehaviorSubject<number>(0);
  }
}
