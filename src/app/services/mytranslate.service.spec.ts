import { TestBed } from '@angular/core/testing';

import { MytranslateService } from './mytranslate.service';

describe('MytranslateService', () => {
  let service: MytranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MytranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
