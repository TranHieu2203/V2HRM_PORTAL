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
  title = 'Codingvila Login With Google';
  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;


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
    protected translationLoaderService: TranslationLoaderService,
    protected translate: TranslateService,
    private globals: Globals,
  ) {

    window.localStorage.clear()
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

    // this.externalAuthService.authState.subscribe((user) => {
    //   console.log(user)
    // })
    this.authService.extAuthChangeSub.subscribe((res: any) => {

      let obj = {
        provider: "GOOGLE",
        idToken: res.idToken,
        lang: this.model.lang
      };
      this.authService.externalLogin(obj).pipe(first())
        .subscribe({
          next: (res: any) => {
            if (res.body.statusCode === "200") {
              debugger;
              localStorage.setItem('user', JSON.stringify(res.body.data));
              this.authService.userSubject.next(res.body.data);
              // this.notification.success("Thông báo", "[Đăng nhập thành công]")
              this.router.navigateByUrl('/home');
              return;
            } else if (res.body.statusCode == "400") {
              if (res.body.message == "ERROR_PASSWORD_INCORRECT") {
                this.notification.warning("Mật khẩu không đúng!");
              }
              else if (res.body.message == "ERROR_USERNAME_INCORRECT") {
                this.notification.warning("Tài khoản không đúng!");
              } else if (res.body.message == "ERROR_LOCKED") {
                this.notification.warning("Tài khoản đã bị khóa!");
              } else if (res.body.message == "NOT_PERMISSION_IN_WEBAPP") {
                this.notification.warning("Bạn không có quyền truy cập!");
              }
              else {
                this.notification.warning(res.body.message);
              }

            }
          },
          error: error => {
            this.loading = false;
          }
        });
    })
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
    this.translationLoaderService.loadTranslations(vietnam, english);
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
    return this.authService.logIn({
      ...this.authForm.value,
      username: this.authForm.value.user_name,
      email: this.authForm.value.user_name,
      rememberme: this.authForm.value.remember
    })
      .pipe(first())
      .subscribe({
        next: (res: any) => {

          if (res.body.statusCode === "200") {
            localStorage.setItem('user', JSON.stringify(res.body.data));
            this.authService.userSubject.next(res.body.data);
            this.notification.success("[Đăng nhập thành công]")
            this.router.navigateByUrl('');
            //window.location.assign('')
            return;
          } else if (res.body.statusCode == "400") {
            if (res.body.message == "ERROR_PASSWORD_INCORRECT") {
              this.notification.warning("Mật khẩu không đúng!");
            }
            else if (res.body.message == "ERROR_USERNAME_INCORRECT") {
              this.notification.warning("Tài khoản không đúng!");
            } else if (res.body.message == "ERROR_LOCKED") {
              this.notification.warning("Tài khoản đã bị khóa!");
            } else if (res.body.message == "NOT_PERMISSION_IN_WEBAPP") {
              this.notification.warning("Bạn không có quyền truy cập!");
            }
            else {
              this.notification.warning(res.body.message);
            }

          }
        },
        error: () => {
          this.loading = false;
        }
      });
  }



  externalLogin = () => {
  }


  callLoginGoogle() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {
        let profile = googleAuthUser.getBasicProfile();
        let obj = {
          provider: "GOOGLE",
          idToken: googleAuthUser.getAuthResponse().id_token,
          lang: this.model.lang
        };
        this.authService.externalLogin(obj).pipe(first())
          .subscribe({
            next: (res: any) => {
              if (res.body.statusCode === "200") {
                debugger;
                localStorage.setItem('user', JSON.stringify(res.body.data));
                this.authService.userSubject.next(res.body.data);
                this.notification.success("[Đăng nhập thành công]")
                this.router.navigateByUrl('/home');
                return;
              } else if (res.body.statusCode == "400") {
                if (res.body.message == "ERROR_PASSWORD_INCORRECT") {
                  this.notification.warning("Mật khẩu không đúng!");
                }
                else if (res.body.message == "ERROR_USERNAME_INCORRECT") {
                  this.notification.warning("Tài khoản không đúng!");
                } else if (res.body.message == "ERROR_LOCKED") {
                  this.notification.warning("Tài khoản đã bị khóa!");
                } else if (res.body.message == "NOT_PERMISSION_IN_WEBAPP") {
                  this.notification.warning("Bạn không có quyền truy cập!");
                }
                else {
                  this.notification.warning(res.body.message);
                }

              }
            },
            error: error => {
              this.loading = false;
            }
          });
        // console.log("profile", profile)
        // console.log("googleAuthUser.getAuthResponse", googleAuthUser.getAuthResponse())
        // console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());

      }, (error: any) => {

      });

  }
  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '610100821104-bfe0jkmc5ka4cnag81gv2falidanmjcf.apps.googleusercontent.com',
          plugin_name: 'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLoginGoogle();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  isDirty() {
    return this.authForm.dirty;
  }

}
