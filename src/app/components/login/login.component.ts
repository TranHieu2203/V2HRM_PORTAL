import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, first } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { RandomImageService } from 'src/app/services/random-image.service';
import { V2Hrm2022 } from 'src/app/services/common-http-request.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from 'src/app/common/translation-loader.service';
import { FieldSettingsModel } from "@syncfusion/ej2-dropdowns";

import { locale as english } from "src/assets/i18n/en";
import { locale as vietnam } from "src/assets/i18n/vi";
import { LoginInterface } from './login.interface';
import { Globals } from 'src/app/common/globals';

interface Language {
  id: string;
  name: string;
  image: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('remember') remember!: ElementRef;

  authForm: FormGroup;
  loading = false;
  backgroundImage?: string;
  values: any = {
    user_name: "",
    password: ""
  }
  jsonValues: string = "";
  authenticated!: boolean;
  server!: string;

  model: LoginInterface = new LoginInterface();
  languages: any;
  languagesList: Language[] = [
    { id: 'vi', name: 'Tiếng Việt', image: '../../../assets/images/auth/vi.png' },
    { id: 'en', name: 'English', image: '../../../assets/images/auth/en.png' },
  ];
  public fields: FieldSettingsModel = { value: "id", text: "name" };
  constructor(
    public authService: AuthService,
    private randomImageService: RandomImageService,
    private router: Router,
    private formBuilder: FormBuilder,
    protected notification: NotificationService,
    protected tlaTranslationLoaderService: TranslationLoaderService,
    protected translate: TranslateService,
    private globals: Globals,

  ) {


    let remember: boolean = true;
    this.authForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      remember: [remember],
      lang: ["vi"]
    });

    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
    this.model.lang = "vi"
    window.localStorage.setItem('lang', this.model.lang)
    this.languages = this.globals.currentLang;
    translate.use(this.model.lang);
    if (localStorage) {
      const lsRemember = localStorage.getItem('remember');
      if (lsRemember) remember = JSON.parse(lsRemember);
    }


  }

  req: any;
  randomImageServiceSubscription!: Subscription;
  authServiceLogoutSubscription!: Subscription;


  switchLang(lang: string) {
    console.log(lang)
    window.localStorage.setItem('lang', lang)
    this.translate.use(lang);
  }



  ngOnInit(): void {
    this.tlaTranslationLoaderService.loadTranslations(vietnam, english);
    this.server = this.authService.serverModel.modelName;
    this.randomImageServiceSubscription = this.randomImageService.get().subscribe(x => this.backgroundImage = x.src);
  }

  ngAfterViewInit(): void {
    this.remember.nativeElement.focus();
  }

  ngOnDestroy(): void {
    if (this.randomImageServiceSubscription) this.randomImageServiceSubscription.unsubscribe();
    if (this.authServiceLogoutSubscription) this.authServiceLogoutSubscription.unsubscribe();
  }

  get formControls() { return this.authForm.controls; }

  onServerChanged(e: any) {
    if (e.target.value === '0') this.authService.serverModel = V2Hrm2022;
  }

  signIn() {
    if (this.authForm.invalid) {
      return;
    }
    this.req = this.authService.logIn({
      ...this.authForm.value,
      username: this.authForm.value.user_name,
      email: this.authForm.value.user_name,
      rememberme: this.authForm.value.remember
    })
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          if (res.body.statusCode === "200") {
            this.notification.success("Thông báo", "[Đăng nhập thành công]")
            this.router.navigateByUrl('');
            return;
          } else {
            this.notification.warning("Thông báo", "Sai mật khẩu....")
            return;
          }
        },
        error: error => {
          this.loading = false;
        }
      });
  }

  isDirty() {
    return this.authForm.dirty;
  }

}
