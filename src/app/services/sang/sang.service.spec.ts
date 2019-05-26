import { TestBed } from '@angular/core/testing';

import { SangService } from './sang.service';

describe('SangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SangService = TestBed.get(SangService);
    expect(service).toBeTruthy();
  });
});
