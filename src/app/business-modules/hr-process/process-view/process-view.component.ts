import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'process-view',
  templateUrl: './process-view.component.html',
  styleUrls: ['./process-view.component.css']
})
export class ProcessViewComponent implements OnInit {
  @Input() public selectedDosing: any;
  constructor() { }

  ngOnInit() {
  }

}
