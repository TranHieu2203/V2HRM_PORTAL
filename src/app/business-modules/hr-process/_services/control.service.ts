import { AuthService } from './../../../services/auth.service';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Behavior } from 'popper.js';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  needLoad: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private processId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private nodeId: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public processId$ = this.processId.asObservable()
  public nodeId$ = this.processId.asObservable()

  private curentNode: BehaviorSubject<object> = new BehaviorSubject<object>([])
  public curentNodeInfo$ = this.curentNode.asObservable()

  constructor(private route: ActivatedRoute,
    private commonHttpRequestService: CommonHttpRequestService,
    private authService: AuthService) {
    this.route.queryParams.subscribe(value => {
      console.log("value", value)
      this.processId.next(value.process)
      this.nodeId.next(value.node)
    })

    this.processId.subscribe(value => {
      this.commonHttpRequestService.commonGetRequest(
        'GetHrProcessById',
        this.authService.serverModel.getHrProcessById! + "?id=" + this.processId.value
      ).subscribe((res: any) => {
        this.curentNode.next(res.body.data)
      })
    })

    this.needLoad.subscribe((value: any) => {
      if (value) {
        this.commonHttpRequestService.commonGetRequest(
          'GetHrProcessById',
          this.authService.serverModel.getHrProcessById! + "?id=" + this.processId.value
        ).subscribe((res: any) => {
          this.curentNode.next(res.body.data)
          this.needLoad.next(false)
        })
      }
    })

  }
  GetHrProcessById() {

  }

}
