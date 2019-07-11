import { TestBed } from '@angular/core/testing';

import { UniversalRequestService } from './universal-request.service';

describe('UniversalRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniversalRequestService = TestBed.get(UniversalRequestService);
    expect(service).toBeTruthy();
  });
});
