import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  auth: Auth;
  randomAvatarSrc: string;
  isOpen: boolean = false;
  menuClass: string = `${this.isOpen ? " show" : ""}`;

  constructor(private authService: AuthService, private randomAvatarService: RandomAvatarService) { 
    this.auth = this.authService.auth;
    this.randomAvatarSrc = this.randomAvatarService.get();
  }

  ngOnInit(): void {
  }

  toggleOpen = () => this.isOpen = !this.isOpen;

}
