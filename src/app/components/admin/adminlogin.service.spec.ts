import { TestBed, inject } from '@angular/core/testing';

import { AdminloginService } from './adminlogin.service';

describe('AdminloginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminloginService]
    });
  });

  it('should be created', inject([AdminloginService], (service: AdminloginService) => {
    expect(service).toBeTruthy();
  }));
});
