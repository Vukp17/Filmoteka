import { TestBed } from '@angular/core/testing';

import { MovieResloverService } from './movie-reslover.service';

describe('MovieResloverService', () => {
  let service: MovieResloverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieResloverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
