import { TestBed } from '@angular/core/testing';

import { PopoverService } from './popover.service';

describe('PopoverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopoverService = TestBed.get(PopoverService);
    expect(service).toBeTruthy();
  });
});
