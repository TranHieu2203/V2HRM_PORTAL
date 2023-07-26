import { Component, OnInit, isDevMode, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';
import { User } from './model/user';
import { setCulture } from '@syncfusion/ej2-base';
import { SpinnerService } from './services/spinne.service';
import { NotificationService } from './services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from "src/assets/i18n/en";
import { locale as vietnam } from "src/assets/i18n/vi";

setCulture('en')
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
    '../assets/css/themify-icons.css',
    '../assets/css/feather.css',
    '../assets/css/style.css',
    '../assets/css/emoji.css',
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  authenticated!: boolean;

  user?: User | null;

  submitting: boolean = true;
  popupMode!: boolean;

  color = '';
  title: any;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private messageService: MessageService,
    public spinnerService: SpinnerService,
    protected _notification: NotificationService,
    protected translate: TranslateService
  ) {
    // Add languages
    this.translate.addLangs(["vi", "en"]);

    // Set the default language
    this.translate.setDefaultLang("vi");

    translate.use('vi');

    this.authService.user.subscribe(x => this.user = x);
  }

  ngOnInit() {
    if (isDevMode()) {
      console.log('Development!');
      this.messageService.add(`${new Date().toLocaleString()}: Your application is running in Development mode!`);
    } else {
      console.log('Production!');
      this.messageService.add(`${new Date().toLocaleString()}: Your application is running in Production mode!`);
    }
  }

  showHeroes = true;
  showConfig = true;
  showDownloader = true;
  showUploader = true;
  showSearch = true;

  toggleHeroes() { this.showHeroes = !this.showHeroes; }
  toggleConfig() { this.showConfig = !this.showConfig; }
  toggleDownloader() { this.showDownloader = !this.showDownloader; }
  toggleUploader() { this.showUploader = !this.showUploader; }
  toggleSearch() { this.showSearch = !this.showSearch; }
}
