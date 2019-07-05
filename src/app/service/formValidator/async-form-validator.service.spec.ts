import { TestBed } from '@angular/core/testing';

import { AsyncFormValidatorService } from './async-form-validator.service';

describe('AsyncFormValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsyncFormValidatorService = TestBed.get(AsyncFormValidatorService);
    expect(service).toBeTruthy();
  });
});
