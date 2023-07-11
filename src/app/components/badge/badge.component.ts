import { Component, OnInit } from '@angular/core';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { RandomImageService } from 'src/app/services/random-image.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {

  constructor(private randomAvatarService: RandomAvatarService, private randomImageService: RandomImageService) { }

  ngOnInit(): void {
  }

  badgeList = [
    {
      imageUrl: this.randomAvatarService.get(),
      bgUrl: this.randomImageService.get(),
      name: 'Aliqa Macale',
      email: 'support@gmail.com',
      connections: '55.7k',
      follower: '105k',
      following: '71k',
      badge1: 'top-student.svg',
      badge2: 'onfire.svg',
      badge3: '',
      badge4: 'fast-graduate.svg',
    },
    {
      imageUrl: this.randomAvatarService.get(),
      bgUrl: this.randomImageService.get(),
      name: 'Hendrix Stamp',
      email: 'support@gmail.com',
      connections: '55.7k',
      follower: '105k',
      following: '71k',
      badge1: 'top-student.svg',
      badge2: 'onfire.svg',
      badge3: 'challenge-medal.svg',
      badge4: 'fast-graduate.svg',
    },
    {
      imageUrl: this.randomAvatarService.get(),
      bgUrl: this.randomImageService.get(),
      name: 'Stephen Grider',
      email: 'support@gmail.com',
      connections: '55.7k',
      follower: '105k',
      following: '71k',
      badge1: '',
      badge2: 'onfire.svg',
      badge3: 'challenge-medal.svg',
      badge4: 'fast-graduate.svg',
    },
    {
      imageUrl: this.randomAvatarService.get(),
      bgUrl: this.randomImageService.get(),
      name: 'Mohannad Zitoun',
      email: 'support@gmail.com',
      connections: '55.7k',
      follower: '105k',
      following: '71k',
      badge1: 'top-student.svg',
      badge2: '',
      badge3: 'challenge-medal.svg',
      badge4: 'fast-graduate.svg',
    },
    {
      imageUrl: this.randomAvatarService.get(),
      bgUrl: this.randomImageService.get(),
      name: 'Aliqa Macale',
      email: 'support@gmail.com',
      connections: '55.7k',
      follower: '105k',
      following: '71k',
      badge1: 'top-student.svg',
      badge2: 'onfire.svg',
      badge3: 'challenge-medal.svg',
      badge4: 'fast-graduate.svg',
    },
    {
      imageUrl: this.randomAvatarService.get(),
      bgUrl: this.randomImageService.get(),
      name: 'Surfiya Zakir',
      email: 'support@gmail.com',
      connections: '55.7k',
      follower: '105k',
      following: '71k',
      badge1: 'top-student.svg',
      badge2: 'onfire.svg',
      badge3: 'challenge-medal.svg',
      badge4: 'fast-graduate.svg',
    },
  ]

}
