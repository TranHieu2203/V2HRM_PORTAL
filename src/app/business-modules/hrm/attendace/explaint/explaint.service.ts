import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root'
})
export class ExplaintService {

constructor(
  private commonHttpRequestService: CommonHttpRequestService, 
  private authService: AuthService
) { }

getTimeExplaint(): Observable<any> {
  return this.commonHttpRequestService.commonGetRequest(
    'getTimeExplaint',
    this.authService.serverModel.getTimeExplaint!

  )
}
}
