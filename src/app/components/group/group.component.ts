import { Component, OnInit } from '@angular/core';
import { RandomImageService } from 'src/app/services/random-image.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  imageUrl1?: string | undefined;
  imageUrl2?: string | undefined;
  groupList = [
    {
      imageUrl: this.imageUrl1,
      name: 'Studio Express',
      friend: '12',
    },
    {
      imageUrl: this.imageUrl2,
      name: 'Armany Design',
      friend: '18',
    },
  ]
  constructor(private randomImageService: RandomImageService) { }

  ngOnInit(): void {
    this.randomImageService.get().subscribe(x => {
      this.imageUrl1 = x.src;
      this.groupList[0].imageUrl = this.imageUrl1;
    })
    this.randomImageService.get().subscribe(x => {
      this.imageUrl2 = x.src;
      this.groupList[1].imageUrl = this.imageUrl2;
    })
  }

}
