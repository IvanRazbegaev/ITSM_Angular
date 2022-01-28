import { TestBed } from '@angular/core/testing';

import { TrackerBackendService } from './tracker-backend.service';

describe('TrackerBackendService', () => {
  let service: TrackerBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackerBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
