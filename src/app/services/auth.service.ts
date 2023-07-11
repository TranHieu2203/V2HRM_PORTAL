import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, map } from 'rxjs';
import { Router } from '@angular/router';

import { Auth } from '../interfaces/auth';
import { LoginRequest } from '../interfaces/user';

import { CommonHttpRequestService, IServerModel, V2Hrm2022 } from './common-http-request.service';
import { MessageService } from './message.service';
import { RandomAvatarService } from './random-avatar.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverModel: IServerModel = V2Hrm2022;

  private userSubject!: BehaviorSubject<User | null>;
  public user!: Observable<User | null>;



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
    private messenger: MessageService,
    private commonHttpRequestService: CommonHttpRequestService,
    private randomAvatarService: RandomAvatarService,
  ) {
    this.avatar = this.randomAvatarService.get();
    this.avatar = "https://news.vmogroup.com/wp-content/uploads/2023/04/VMO_Logo_Positive.png"
    
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
    // this.stylesMap.delete(key);
    // this.host.removeChild(styleEl);

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
    ).pipe(map((user: any | null) => {
      console.log(user)
      localStorage.setItem('user', JSON.stringify(user.body.data));
      this.userSubject.next(user);
      return user;
  }))
  }

  getAuthorizationToken(): string {
    return JSON.parse(localStorage.getItem('user')!).token;
  }

  

  refreshToken(token?: string | undefined | null): Observable<any> {

    this.loading.next(true);

    return this.commonHttpRequestService.commonPostRequest(
      'refreshTokenRequest',
      this.serverModel.refreshTokenUrl,
      !!token ? { token } : {},
    )
  }

  /*
  isLoggedIn(): boolean {
    const checkValue = !!this.auth.data;
    this.authenticated$.next(checkValue);
    return checkValue;
  }
  */
  isAuth():boolean{
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
