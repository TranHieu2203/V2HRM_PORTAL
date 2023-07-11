import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagetitle',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.css']
})
export class PagetitleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  _showSearch!: any;
  _showModify!: any;

  @Input() title?: string;
  @Input() 
    get showSearch(): any {
      return this._showSearch;
    }
    set showSearch(value: any) {
      this._showSearch = value;
    }
  @Input()
    get showModify(): any {
      return this._showModify;
    }
    set showModify(value: any) {
      this._showModify = value;
    }
}
