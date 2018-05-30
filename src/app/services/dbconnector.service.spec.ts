import { TestBed, inject } from '@angular/core/testing';

import { DbconnectorService } from './dbconnector.service';

describe('DbconnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbconnectorService]
    });
  });

  it('should be created', inject([DbconnectorService], (service: DbconnectorService) => {
    expect(service).toBeTruthy();
  }));
});
