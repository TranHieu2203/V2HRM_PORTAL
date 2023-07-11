import { TestBed } from '@angular/core/testing';

import { PackageSearchService } from './package-search.service';

describe('PackageSearchService', () => {
  let service: PackageSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
