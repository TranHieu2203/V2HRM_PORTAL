import { Component, OnInit } from '@angular/core';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friendList = [
    {
      imageUrl: this.randomAvatarService.get(),
      name: 'Anthony Daugloi',
      friend: '12',
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

  ngOnInit(): void { }

}
