import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from './common-http-request.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HrProcessService {
  private processList: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public processList$ = this.processList.asObservable();
  constructor(private commonHttpRequestService: CommonHttpRequestService, private authService: AuthService) {
    // load các process của user đang đăng nhập
    this.commonHttpRequestService.commonGetRequest("", "hr-process/employee-process").subscribe((res: any) => {
      if (res.body.statusCode == "200") {
        this.processList.next(res.body.data)
      }
    })
  }
}
