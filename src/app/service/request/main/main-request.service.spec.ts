import { TestBed } from '@angular/core/testing';

import { MainRequestService } from './main-request.service';

describe('MainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainRequestService = TestBed.get(MainRequestService);
    expect(service).toBeTruthy();
  });
});
