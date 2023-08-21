/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrProcessService } from './hr-process.service';

describe('Service: HrProcess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrProcessService]
    });
  });

  it('should ...', inject([HrProcessService], (service: HrProcessService) => {
    expect(service).toBeTruthy();
  }));
});
