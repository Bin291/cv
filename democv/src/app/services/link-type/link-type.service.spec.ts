import { TestBed } from '@angular/core/testing';

import { LinkTypeService } from './link-type.service';

describe('LinkTypeService', () => {
  let service: LinkTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
