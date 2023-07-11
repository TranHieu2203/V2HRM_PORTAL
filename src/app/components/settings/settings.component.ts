import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  saveRefreshTokenInLocalStorage: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage) {
      const token = localStorage.getItem('token');
      if (token) this.saveRefreshTokenInLocalStorage = true;
    }
  }

  logout() {
    this.authService.logout();
  }

  tokenCheckedChange(e: Event) {
    if (localStorage) {
      if (e) {
        localStorage.setItem('token', this.authService.auth.data.refreshToken.token)
      } else {
        if (!!localStorage.getItem('token')) localStorage.removeItem('token')
      }
    }
  }

}
