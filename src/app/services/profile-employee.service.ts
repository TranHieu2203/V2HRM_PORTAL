import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonHttpRequestService } from './common-http-request.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileEmployeeService {


  genderList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])


constructor(private commonHttpRequestService: CommonHttpRequestService,
  private authService: AuthService,
) { }

  getEmployeeInfo(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getEmployeeInfo',
      this.authService.serverModel.getEmployeeInfoUrl!
    )
  }
}

