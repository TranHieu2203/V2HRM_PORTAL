import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, first } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { RandomImageService } from 'src/app/services/random-image.service';
import { V2Hrm2022 } from 'src/app/services/common-http-request.service';


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

  constructor(
    public authService: AuthService,
    private randomImageService: RandomImageService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

    let remember: boolean = true;

    if (localStorage) {
      const lsRemember = localStorage.getItem('remember');
      if (lsRemember) remember = JSON.parse(lsRemember);
    }

    this.authForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      remember: [remember]
    });
  }

  req: any;
  randomImageServiceSubscription!: Subscription;
  authServiceLogoutSubscription!: Subscription;

  ngOnInit(): void {
    this.server = this.authService.serverModel.modelName;
    this.randomImageServiceSubscription = this.randomImageService.get().subscribe(x => this.backgroundImage = x.src);

 
    
    // this.authServiceLogoutSubscription = this.authService.logout(false).subscribe(() => {
    //   this.authService.authenticated$.next(false);
    //   this.req = this.authService.logIn({
    //     ...this.authForm.value,
    //     username: this.authForm.value.user_name,
    //     email: this.authForm.value.user_name,
    //     rememberme: this.authForm.value.remember
    //   })
    // });
    
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
        next: () => {
            // get return url from query parameters or default to home page
            this.router.navigateByUrl('');
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
