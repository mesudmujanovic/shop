import { TestBed } from '@angular/core/testing';

import { StriceService } from './strice.service';

describe('StriceService', () => {
  let service: StriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
