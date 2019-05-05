import { TestBed } from '@angular/core/testing';

import { DominantColorService } from './dominant-color.service';

describe('DominantColorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DominantColorService = TestBed.get(DominantColorService);
    expect(service).toBeTruthy();
  });
});
