import { Globals } from './../common/globals';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, map, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Auth } from '../interfaces/auth';
import { LoginRequest } from '../interfaces/user';

import { CommonHttpRequestService, IServerModel, V2Hrm2022 } from './common-http-request.service';
import { MessageService } from './message.service';
import { RandomAvatarService } from './random-avatar.service';
import { User } from '../model/user';


import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { NotificationService } from './notification.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverModel: IServerModel = V2Hrm2022;

  public userSubject!: BehaviorSubject<User | null>;
  public user!: Observable<User | null>;

  private authChangeSub = new Subject<boolean>();
  public extAuthChangeSub = new Subject<any>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();


  initialAuth: Auth = {
    loading: false,
    error: false,
    message: '',
    data: null,
    loginStatus: 0,
    tokenStatus: 0
  }

  auth: Auth = this.initialAuth;
  loading = new BehaviorSubject<boolean>(false);
  authenticated$ = new BehaviorSubject<boolean>(false);

  fullname!: string;
  avatar!: string;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;
  private stylesMap: Map<any, Node> = new Map();
  private host!: Node;

  constructor(
    private router: Router,
    private commonHttpRequestService: CommonHttpRequestService,
    private externalAuthService: SocialAuthService,
    private global: Globals
  ) {
    this.avatar = "https://news.vmogroup.com/wp-content/uploads/2023/04/VMO_Logo_Positive.png"
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();

    this.externalAuthService.authState.subscribe((user) => {
      this.extAuthChangeSub.next(user);



    })


  }

  public get userValue() {
    return this.userSubject.value;
  }

  logIn(loginRequest: LoginRequest): Observable<any> {
    this.loading.next(true);
    return this.commonHttpRequestService.commonPostRequest(
      'logInRequest',
      this.serverModel.loginUrl,
      loginRequest,
    ).pipe(map((data: any | null) => {
      // if (user.body.statusCode === "200") {
      //   this.userSubject.next(user);
      // }
      return data;

    }))
  }

  getAuthorizationToken(): string {
    if (localStorage.getItem('user') != null) return JSON.parse(localStorage.getItem('user')!)!.token!;
    return "";
  }



  refreshToken(token?: string | undefined | null): Observable<any> {

    this.loading.next(true);

    return this.commonHttpRequestService.commonPostRequest(
      'refreshTokenRequest',
      this.serverModel.refreshTokenUrl,
      !!token ? { token } : {},
    )
  }

  externalLogin(obj: any): Observable<any> {

    console.log("obj", obj)
    return this.commonHttpRequestService.commonPostRequest(
      'externalLogin',
      this.serverModel.externalLogin,
      obj,
    ).pipe(map((data: any | null) => {
      return data;
    }))
  }

  isAuth(): boolean {
    return true;
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);

    // this.router.navigate(['/']);
    this.router.navigate(['/account/login']);
  }

  public getJsonData(): string {
    return (JSON.stringify(this.auth.data, null, 2));
  }


}
