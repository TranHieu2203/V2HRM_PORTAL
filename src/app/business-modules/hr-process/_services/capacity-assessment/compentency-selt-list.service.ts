import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root'
})
export class CompentencySeltListService {

  constructor(private commonHttpRequestService: CommonHttpRequestService,
    private authService: AuthService) {

  }
  getCompentencySeltList(periodId: number = 1) {
    return this.commonHttpRequestService.commonGetRequest(
      'getCompentencySeltList',
      this.authService.serverModel.getCompentencySeltList! + "?periodId=" + periodId

    )
  }
}
