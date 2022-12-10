import { TestBed } from '@angular/core/testing';

import { MyTranslateService } from './my-translate.service';

describe('MyTranslateService', () => {
  let service: MyTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
