import { Component, OnInit } from '@angular/core';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { RandomImageService } from 'src/app/services/random-image.service';

@Component({
  selector: 'app-storyslider',
  templateUrl: './storyslider.component.html',
  styleUrls: ['./storyslider.component.css']
})
export class StorysliderComponent implements OnInit {

  constructor(private randomAvatarService: RandomAvatarService, private randomImageService: RandomImageService) { }

  ngOnInit(): void {
    this.storyList.map(x => this.randomImageService.get().subscribe(y => x.bgUrl = y.src));
    //window.addEventListener('resize', this.onResize);
  }

  storyList = [
    {
      bgUrl: '',
      imageUrl: this.randomAvatarService.get(),
      name: 'Aliqa Macale ',
      email: 'support@gmail.com',
    },
    {
      bgUrl: '',
      imageUrl: this.randomAvatarService.get(),
      name: 'Seary Victor ',
      email: 'support@gmail.com',
    },
    {
      bgUrl: '',
      imageUrl: this.randomAvatarService.get(),
      name: 'John Steere ',
      email: 'support@gmail.com',
    },
    {
      bgUrl: '',
      imageUrl: this.randomAvatarService.get(),
      name: 'Mohannad ',
      email: 'support@gmail.com',
    },
    {
      bgUrl: '',
      imageUrl: this.randomAvatarService.get(),
      name: 'Studio ',
      email: 'support@gmail.com',
    },
    {
      bgUrl: '',
      imageUrl: this.randomAvatarService.get(),
      name: 'Hendrix ',
      email: 'support@gmail.com',
    },
    {
      bgUrl: '',
      imageUrl: this.randomAvatarService.get(),
      name: 'Zitoun ',
      email: 'support@gmail.com',
    },
  ];

  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: false,
    nextArrow: false,
  };

  /*
  onResize(): void {
    In this case, this = window
  }
  */

  /*
  onResize = (): void => {
    In this case, this = component
  }
  */
  /*
  onResize = (): any => {
    this.x.next(!this.x.value)
  }
  */
}
