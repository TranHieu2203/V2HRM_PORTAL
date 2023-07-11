import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventsList = [
    {
      date: '13',
      month: 'APR',
      status: 'bg-warning',
      name: 'Meeting with clients',
      location: '41 madison ave, floor 24 new work, NY 10010',
    },
    {
      date: '22',
      month: 'APR',
      status: 'bg-primary',
      name: 'Developer Programe',
      location: '41 madison ave, floor 24 new work, NY 10010',
    },
    {
      date: '30',
      month: 'APR',
      status: 'bg-success',
      name: 'Aniversary Event',
      location: '41 madison ave, floor 24 new work, NY 10010',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
