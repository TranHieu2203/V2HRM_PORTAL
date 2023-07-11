import { TestBed } from '@angular/core/testing';

import { CanDeactivateMoreGuard } from './can-deactivate-more.guard';

describe('CanDeactivateMoreGuard', () => {
  let guard: CanDeactivateMoreGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanDeactivateMoreGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
