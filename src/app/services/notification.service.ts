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
  private timeout = 3000;
  constructor(
    protected translate: TranslateService) {
    this.translate.setDefaultLang('vi');
    this.translate.use('vi');
  }

  getObservable(): Observable<Notification> {
    return this._subject.asObservable();
  }

  info(message: string) {
    this.translate.get(message).subscribe((data) => {
      this._subject.next(new Notification(this._idx++, NotificationType.info, "Thông báo", data, this.timeout));
    })
  }

  success(message: string) {
    this.translate.get(message).subscribe((data) => {
      console.log("data",data)
      this._subject.next(new Notification(this._idx++, NotificationType.success, "Thông báo", data, this.timeout));
    })
  }

  warning(message: string) {
    this.translate.get(message).subscribe((data) => {
      this._subject.next(new Notification(this._idx++, NotificationType.warning, "Thông báo", data, this.timeout));
    })
  }

  error(message: string) {
    this._subject.next(new Notification(this._idx++, NotificationType.error, "Thông báo", message, this.timeout));
  }

}
