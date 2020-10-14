import { TestBed } from '@angular/core/testing';

import { ShoppingDataService } from './shopping-data.service';

describe('ShoppingDataService', () => {
  let service: ShoppingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
