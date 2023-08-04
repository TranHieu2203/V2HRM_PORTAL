import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  @Input() HrProcessName: string = "";
  constructor() { }

  ngOnInit() {
  }

}
