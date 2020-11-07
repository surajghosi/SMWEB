import { TestBed } from '@angular/core/testing';

import { ManageleadaccessService } from './manageleadaccess.service';

describe('ManageleadaccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageleadaccessService = TestBed.get(ManageleadaccessService);
    expect(service).toBeTruthy();
  });
});
