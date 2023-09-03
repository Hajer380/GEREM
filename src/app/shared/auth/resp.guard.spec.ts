import { TestBed } from '@angular/core/testing';

import { RespGuard } from './resp.guard';

describe('RespGuard', () => {
  let guard: RespGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RespGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
