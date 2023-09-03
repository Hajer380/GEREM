import { TestBed } from '@angular/core/testing';

import { RESPGuard } from './resp.guard';

describe('RESPGuard', () => {
  let guard: RESPGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RESPGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
