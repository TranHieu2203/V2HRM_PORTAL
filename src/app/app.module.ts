import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { httpInterceptorProviders } from './http-interceptors'

import { LightboxModule } from 'ngx-lightbox';

import { SlickCarouselModule } from 'ngx-slick-carousel'
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared.module';
import { LibrariesModule } from './libraries.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from './directives.module';

import { AppErrorHandler } from './app-error-handler';

import { AppComponent } from './app.component';
import { ModulesComponent } from './components/modules/modules.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftnavComponent } from './components/leftnav/leftnav.component';
import { RightchatComponent } from './components/rightchat/rightchat.component';
import { RightbarComponent } from './components/right-bar/right-bar.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { DarkbuttonComponent } from './components/darkbutton/darkbutton.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StorysliderComponent } from './components/storyslider/storyslider.component';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { PostviewComponent } from './components/postview/postview.component';
import { MembersliderComponent } from './components/memberslider/memberslider.component';
import { FriendsilderComponent } from './components/friendsilder/friendsilder.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { GroupComponent } from './components/group/group.component';
import { EventsComponent } from './components/events/events.component';
import { ProfilephotoComponent } from './components/profilephoto/profilephoto.component';
import { BadgeComponent } from './components/badge/badge.component';
import { ConfigComponent } from './config/config.component';
import { MessagesComponent } from './messages/messages.component';
import { DeveloperComponent } from './components/developer/developer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PopupDeveloperComponent } from './components/popup-developer/popup-developer.component';
import { MccDemoComponent } from './demo/mcc-demo/mcc-demo.component';
import { SyncfusionModule } from './syncfusion.module';
import { AccountComponent } from './components/account/account.component';

import { AuthService } from './services/auth.service';
import { NavigationService } from './services/navigation.service';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { RequestCache, RequestCacheWithMap } from './services/request-cache.service';
import { TotalOverviewComponent } from './components/total-overview/total-overview.component';
import { Globals } from './common/globals';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    LeftnavComponent,
    RightchatComponent,
    RightbarComponent,
    AppfooterComponent,
    DarkbuttonComponent,
    SettingsComponent,
    StorysliderComponent,
    CreatepostComponent,
    PostviewComponent,
    MembersliderComponent,
    FriendsilderComponent,
    FriendsComponent,
    ContactsComponent,
    GroupComponent,
    EventsComponent,
    ProfilephotoComponent,
    BadgeComponent,
    ConfigComponent,
    MessagesComponent,
    DeveloperComponent,
    PageNotFoundComponent,
    PopupDeveloperComponent,
    MccDemoComponent,
    ModulesComponent,
    AccountComponent,
    TotalOverviewComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // import HttpClientModule after BrowserModule
    LightboxModule,
    SlickCarouselModule,
    DirectivesModule,
    LibrariesModule,
    SyncfusionModule,
    SharedModule, // used in multiple modules
    NgbModule,
    AppRoutingModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    TranslateModule.forRoot(),
  ],
  exports: [],
  providers: [
    Globals,
    AuthService,
    HttpErrorHandler,
    MessageService,
    NavigationService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: RequestCache, useClass: RequestCacheWithMap },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    const replacer = (key: string, value: any) => (typeof value === 'function') ? value.name : value;

    //console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
    // console.log('Routes: ', router.config, replacer, 2);
  }
}
