import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit, OnDestroy {

  routerEventsSubscription!: Subscription;

  refreshTokenRequest!: Observable<any>;

  refreshingToken: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private navigationService: NavigationService,
  ) {
    this.routerEventsSubscription = this.router.events.subscribe(x => {
      if (x instanceof NavigationStart) {
        this.navigationService.navigationStart = x;
      }
    })
  }

  ngOnInit(): void {
    /*
    this.refreshingToken = true;
    const token = localStorage && localStorage.getItem('token')
    this.authService.refreshToken(token)
      .subscribe({
        next: (response) => {
          this.refreshingToken = false;
          if (response.ok && response.status === 200) {

            console.log(response)

            switch (this.authService.serverModel.modelName) {

              case SERVER0.modelName:
                if (response.body.statusCode === "200") {
                  this.authService.auth.data = response.body.data;
                  this.authService.authenticated$.next(true);
                  console.log("navigationStart.url: ", this.navigationService.navigationStart.url)
                  if (this.navigationService.navigationStart.url !== '/login') {
                    this.router.navigateByUrl(this.navigationService.navigationStart.url);
                  } else {
                    this.router.navigateByUrl('/home');
                  }
                }

                break;
              case SERVER1.modelName:
              case SERVER2.modelName:

                if (response.body.code === "200") {
                  this.authService.auth.data = response.body.data;
                  this.authService.authenticated$.next(true);
                  console.log("navigationStart.url: ", this.navigationService.navigationStart.url)
                  if (this.navigationService.navigationStart.url !== '/login') {
                    this.router.navigateByUrl(this.navigationService.navigationStart.url);
                  } else {
                    this.router.navigateByUrl('/home');
                  }
                }

                break;

              case SERVER3.modelName:
              case SERVER4.modelName:
                this.authService.auth.data = response.body;
                this.authService.authenticated$.next(true);
                console.log("navigationStart.url: ", this.navigationService.navigationStart.url)
                if (this.navigationService.navigationStart.url !== '/login') {
                  this.router.navigateByUrl(this.navigationService.navigationStart.url);
                } else {
                  this.router.navigateByUrl('/home');
                }
                break;
              default:
                if (response.body.statusCode === "200") {
                  this.authService.auth.data = response.body.data;
                  this.authService.authenticated$.next(true);

                  !!localStorage && !!localStorage.getItem('token') 
                  && localStorage.setItem('token', response.body.data.refreshToken.token);

                  console.log("navigationStart.url: ", this.navigationService.navigationStart.url)
                  if (this.navigationService.navigationStart.url !== '/login') {
                    this.router.navigateByUrl(this.navigationService.navigationStart.url);
                  } else {
                    this.router.navigateByUrl('/home');
                  }
                }

            }
          } else {
            console.log('refreshToken Response not ok and not 200: ', response);
          }

        },
        error: (e) => {
          console.log('RefreshToken error: ', e)
          this.refreshingToken = false;
        },
        complete: () => {

        }
      })
      */
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
  }

}
