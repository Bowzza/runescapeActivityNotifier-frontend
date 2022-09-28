import { TestBed } from '@angular/core/testing';

import { AddingSubService } from './adding-sub.service';

describe('AddingSubService', () => {
  let service: AddingSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddingSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
