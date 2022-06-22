import { TestBed } from '@angular/core/testing';

import { RunServeService } from './run-serve.service';

describe('RunServeService', () => {
  let service: RunServeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunServeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
