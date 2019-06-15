import { TestBed } from '@angular/core/testing';

import { ExpansionPanelService } from './expansion-panel.service';

describe('ExpansionPanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpansionPanelService = TestBed.get(ExpansionPanelService);
    expect(service).toBeTruthy();
  });
});
