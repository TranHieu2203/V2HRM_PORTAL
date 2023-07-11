import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs'

import { MccState } from '../mcc-state';

@Component({
  selector: 'app-mcc-search',
  templateUrl: './mcc-search.component.html',
  styleUrls: ['./mcc-search.component.css']
})
export class MccSearchComponent implements OnInit, OnDestroy {

  list$!: Observable<any[]>;
  keyword!: string;
  placeholder!: string;
  searchholder!: string;

  private subscription!: Subscription;

  constructor(
    private mccState: MccState,
  ) {
  }

  ngOnInit(): void {

    this.mccState.keyword.subscribe(x => this.keyword = x);
    this.placeholder = this.mccState.placeholder;
    this.searchholder = this.mccState.searchholder;

  }

  onKeywordChanged(value: string) {

    this.mccState.keyword.next(value);

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
