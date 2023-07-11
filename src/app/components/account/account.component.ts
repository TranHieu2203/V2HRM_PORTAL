import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent implements OnInit {

  staffProfileForm!: FormGroup;

  fullname!: string;
  avatar!: string;
  activeTab: number = 0;

  constructor(
    private randomAvatarService: RandomAvatarService,
    private commonHttpRequestService: CommonHttpRequestService,
    private authService: AuthService,
    private formBuilder: FormBuilder,

  ) {
    this.staffProfileForm = this.formBuilder.group({
      avatar: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      mobilePhone: ['', Validators.required],
    })
  }

  ngOnInit(): void {

    this.avatar = this.authService.avatar;

    this.commonHttpRequestService.commonGetRequest(
      'getAccountInformation',
      this.authService.serverModel.getAccountInfoUrl!
    )
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          if (x.body.data.avatar) this.avatar = x.body.data.avatar
          this.fullname = x.body.data.fullname;
          this.staffProfileForm.setValue({
            avatar: x.body.data.avatar,
            firstname: x.body.data.firstName,
            lastname: x.body.data.lastName,
            email: x.body.data.email,
            mobilePhone: x.body.data.mobilePhone,
          })
        }
      });
    
    
    this.staffProfileForm.setValue({
      ...this.staffProfileForm.value,
      avatar: this.avatar,
    })
  }

}
