import { TestBed } from '@angular/core/testing';

import { CanDeactivateMainGuard } from './can-deactivate-main.guard';

describe('CanDeactivateMainGuard', () => {
  let guard: CanDeactivateMainGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanDeactivateMainGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
