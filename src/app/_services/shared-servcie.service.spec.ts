import { TestBed } from '@angular/core/testing';

import { SharedServcieService } from './shared-servcie.service';

describe('SharedServcieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedServcieService = TestBed.get(SharedServcieService);
    expect(service).toBeTruthy();
  });
});
