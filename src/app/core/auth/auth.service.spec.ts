import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should return authentication status', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service.isAuthenticated()).toEqual(true);
  });
});
