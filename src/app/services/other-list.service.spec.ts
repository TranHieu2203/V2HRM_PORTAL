import { TestBed } from '@angular/core/testing';

import { OtherListService } from './other-list.service';

describe('OtherListService', () => {
  let service: OtherListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
