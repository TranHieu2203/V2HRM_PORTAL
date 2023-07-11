import { Component, OnInit } from '@angular/core';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';

@Component({
  selector: 'app-friendsilder',
  templateUrl: './friendsilder.component.html',
  styleUrls: ['./friendsilder.component.css']
})
export class FriendsilderComponent implements OnInit {

  slides = [
    {
      name: "Net Core",
      email: "net6core@tinhvan.vn",
      img: this.randomAvatarService.get(),
    },
    {
      name: "Dependency Injection",
      email: "di@tinhvan.vn",
      img: this.randomAvatarService.get(),
    },
    {
      name: "React JS",
      email: "facefake@tinhvan.vn",
      img: this.randomAvatarService.get(),
    },
    {
      name: "React Native",
      email: "metroserver@tinhvan.vn",
      img: this.randomAvatarService.get(),
    },
    {
      name: "Angular 14",
      email: "ivypackage@tinhvan.vn",
      img: this.randomAvatarService.get(),
    },
    {
      name: "Webpack",
      email: "es6@tinhvan.vn",
      img: this.randomAvatarService.get(),
    },
  ]

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
  };

  constructor(private randomAvatarService: RandomAvatarService) { }

  ngOnInit(): void {
  }

}
