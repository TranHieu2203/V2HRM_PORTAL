import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, of } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  
  @Input() keyword!: string;
  @Input() placeholder!: string;
  @Output() onKeywordChanged = new EventEmitter<string>();

  private keyword$ = new Subject<string>();

  constructor() {
    this.keyword$.next(this.keyword)
  }

  ngOnInit(): void {

    /*
    This code will listen to keyword$ of type Subject<string>
    whenever the keyword$ changes, it will wait if user stops typing for 500ms,
    get the last value and create a new Observable based on the value and return it.
    */
    /* Start of the code */
    this.keyword$.pipe(
      // nothing happens during typing with interval (between key strokes) less than current value (in ms):
      debounceTime(500),
      // Only emit when the current value is different than the last:
      distinctUntilChanged(),
      /* On each emission the previous inner observable (the result of the function you supplied)
      is cancelled and the new observable is subscribed.
      */
      switchMap(value => {
        return of(value)
      }))
      .subscribe(response => this.onKeywordChanged.emit(response))
    /* End of the code */
    /*=============================================*/

  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(text: string) {
    this.keyword$.next(text);
  }

}
