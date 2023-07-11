import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { MainComponent } from './main.component';
import { DialogService } from 'src/app/services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateMainGuard implements CanDeactivate<unknown> {

  constructor(private dialogService: DialogService) { }

  canDeactivate(
    component: MainComponent,
  ): Observable<boolean> | boolean {

    if (
      (!component.primaryForm || component.primaryForm?.pristine) &&
      (!component.personalForm || component.personalForm?.pristine) &&
      (!component.ownAddressForm || component.ownAddressForm?.pristine) &&
      (!component.nowAddressForm || component.nowAddressForm?.pristine) &&
      (!component.contactForm || component.contactForm?.pristine)
    ) return true;

    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

}
