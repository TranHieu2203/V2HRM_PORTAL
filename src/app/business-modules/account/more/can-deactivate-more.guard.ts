import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { MoreComponent } from './more.component';
import { DialogService } from 'src/app/services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateMoreGuard implements CanDeactivate<unknown> {

  constructor(private dialogService: DialogService) { }

  canDeactivate(
    component: MoreComponent,
  ): Observable<boolean> | boolean {

    if (
      (!component.passportForm || component.passportForm?.pristine) &&
      (!component.visaForm || component.visaForm?.pristine) &&
      (!component.permitForm || component.permitForm?.pristine) &&
      (!component.certificateForm || component.certificateForm?.pristine)
    ) return true;

    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

}
