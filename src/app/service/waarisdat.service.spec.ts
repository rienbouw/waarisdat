import { TestBed } from '@angular/core/testing';

import { WaarisdatService } from './waarisdat.service';

describe('WaarisdatService', () => {
  let service: WaarisdatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaarisdatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
