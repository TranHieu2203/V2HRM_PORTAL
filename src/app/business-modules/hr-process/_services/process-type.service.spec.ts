/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProcessTypeService } from './process-type.service';

describe('Service: ProcessType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessTypeService]
    });
  });

  it('should ...', inject([ProcessTypeService], (service: ProcessTypeService) => {
    expect(service).toBeTruthy();
  }));
});
