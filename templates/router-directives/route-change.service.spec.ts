import { TestBed, inject } from '@angular/core/testing';

import { RouteChangeService } from './route-change.service';

describe('RouteChangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteChangeService]
    });
  });

  it('should be created', inject([RouteChangeService], (service: RouteChangeService) => {
    expect(service).toBeTruthy();
  }));
});
