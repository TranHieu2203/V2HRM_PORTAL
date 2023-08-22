import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessTypeService {
  processType = new BehaviorSubject<{
    key: number,
    value: string,
    check: boolean
  }[]>([])
  constructor(private commonHttpRequestService: CommonHttpRequestService,
    private authService: AuthService) {

    this.commonHttpRequestService.commonGetRequest('processType', this.authService.serverModel.getProcessType!)
      .subscribe(x => {

        if (x.ok && x.status === 200) {
          const newList: {
            key: number,
            value: string,
            check: boolean
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id,
            value: g.name,
            check: false
          }))
          this.processType.next(newList);
        }
      })
  }


  getHrProcessById(id: number = 1): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'GetHrProcessById',
      this.authService.serverModel.getHrProcessById! + "?id=" + id

    )
  }

}
