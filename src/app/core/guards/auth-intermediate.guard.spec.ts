import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authIntermediateGuard } from './auth-intermediate.guard';

describe('authIntermediateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authIntermediateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
