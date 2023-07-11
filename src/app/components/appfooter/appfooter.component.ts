import { Component, OnInit } from '@angular/core';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';

@Component({
  selector: 'app-appfooter',
  templateUrl: './appfooter.component.html',
  styleUrls: ['./appfooter.component.css']
})
export class AppfooterComponent implements OnInit {

  randomAvatarSrc: string;

  constructor(private randomAvatarService: RandomAvatarService) { 
    this.randomAvatarSrc = this.randomAvatarService.get();
  }

  ngOnInit(): void {
  }

}
