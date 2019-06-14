import { TestBed } from '@angular/core/testing';

import { FabMenuService } from './fab-menu.service';

describe('FabMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FabMenuService = TestBed.get(FabMenuService);
    expect(service).toBeTruthy();
  });
});
