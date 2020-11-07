import { TestBed } from '@angular/core/testing';

import { AdvancedLeadCreatorService } from './advanced-lead-creator.service';

describe('AdvancedLeadCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvancedLeadCreatorService = TestBed.get(AdvancedLeadCreatorService);
    expect(service).toBeTruthy();
  });
});
