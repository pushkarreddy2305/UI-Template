import { TestBed } from '@angular/core/testing';

import { TokeninjectorService } from './tokeninjector.service';

describe('TokeninjectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokeninjectorService = TestBed.get(TokeninjectorService);
    expect(service).toBeTruthy();
  });
});
