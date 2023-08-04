import { TestBed } from '@angular/core/testing';

import { CompentencySeltListService } from './compentency-selt-list.service';

describe('CompentencySeltListService', () => {
  let service: CompentencySeltListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompentencySeltListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
