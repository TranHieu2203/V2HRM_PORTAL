import { Component, OnInit } from '@angular/core';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contactList = [
    {
      imageUrl: this.randomAvatarService.get(),
      name: 'Armany Seary',
      friend: '45',
    },
    {
      imageUrl: this.randomAvatarService.get(),
      name: 'Mohannad Zitoun',
      friend: '18',
    },
    {
      imageUrl: this.randomAvatarService.get(),
      name: 'Hurin Seary',
      friend: '28',
    },
  ]

  constructor(private randomAvatarService: RandomAvatarService) { }

  ngOnInit(): void {
  }

}
