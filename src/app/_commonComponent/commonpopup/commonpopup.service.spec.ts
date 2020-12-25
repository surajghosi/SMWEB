import { TestBed } from '@angular/core/testing';

import { CommonpopupService } from './commonpopup.service';

describe('CommonpopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonpopupService = TestBed.get(CommonpopupService);
    expect(service).toBeTruthy();
  });
});
