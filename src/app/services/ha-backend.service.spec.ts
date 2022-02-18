import { TestBed } from '@angular/core/testing';

import { HaBackendService } from './ha-backend.service';

describe('HaBackendService', () => {
  let service: HaBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HaBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
