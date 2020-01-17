import { TestBed } from '@angular/core/testing';

import { WebpageService } from './webpage.service';

describe('WebpageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebpageService = TestBed.get(WebpageService);
    expect(service).toBeTruthy();
  });
});
