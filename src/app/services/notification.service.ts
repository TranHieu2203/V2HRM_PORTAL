import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { Notification, NotificationType } from "src/app/model/notification"
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {

  private _subject = new Subject<Notification>();
  private _idx = 0;
  private titleInfo = "";
  private titleSuccess = "";
  private titleWarning = "";
  private tigneError = "";

  constructor(
    protected translate: TranslateService) { 
    this.translate.setDefaultLang('vi');
    this.translate.use('vi');
  }

  getObservable(): Observable<Notification> {
    return this._subject.asObservable();
  }

  info(title: string, message: string, timeout = 3000) {
    this.translate.get(message).subscribe((data)=>{
      this._subject.next(new Notification(this._idx++, NotificationType.info, title, data, timeout));
    })
  }

  success(title: string, message: string, timeout = 3000) {
    this.translate.get(message).subscribe((data)=>{
      this._subject.next(new Notification(this._idx++, NotificationType.success, title, data, timeout));
    })
  }

  warning(title: string, message: string, timeout = 3000) {
    this.translate.get(message).subscribe((data)=>{
      this._subject.next(new Notification(this._idx++, NotificationType.warning, title, data, timeout));
    })
  }

  error(title: string, message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.error, title, message, timeout));
  }

}
