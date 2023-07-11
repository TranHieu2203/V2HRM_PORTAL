/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfileEmployeeService } from './profile-employee.service';

describe('Service: ProfileEmployee', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileEmployeeService]
    });
  });

  it('should ...', inject([ProfileEmployeeService], (service: ProfileEmployeeService) => {
    expect(service).toBeTruthy();
  }));
});
